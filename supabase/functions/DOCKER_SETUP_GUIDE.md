# Docker Setup Guide for n8n + Cloudflared + Static Server

This guide explains how to add the auto-detecting static-server to your existing n8n Docker setup.

## Architecture

```
┌─────────────┐
│    n8n      │  Creates workflow, sends HTTP requests
└──────┬──────┘
       │
       │ (same Docker network)
       │
       ├──────────────────────────────────┐
       │                                  │
       │                                  │
┌──────▼────────┐              ┌─────────▼────────┐
│ cloudflared   │              │ static-server    │
│               │              │                  │
│ Exposes:      │◄─────────────│ Auto-detects     │
│ :2000/metrics │  fetches     │ tunnel URL       │
│               │              │                  │
│ Creates:      │              │ Serves:          │
│ https://...   │─────────────►│ /images/*        │
│ tunnel URL    │  proxies     │                  │
└───────────────┘              └──────────────────┘
```

## Prerequisites

You should already have:
- ✅ Docker and Docker Compose installed
- ✅ n8n running in Docker
- ✅ Cloudflared tunnel running in Docker
- ✅ All services on the same Docker network

## Step 1: Build the Static Server

```bash
cd /Users/jupiter/dev/woodshed/languageacademy/supabase/functions/static-server
docker build -t static-server:latest .
```

## Step 2: Add to Your docker-compose.yml

**Find your existing docker-compose.yml** (where you have n8n and cloudflared defined)

**Add this service:**

```yaml
services:
  # ... your existing n8n and cloudflared services ...

  static-server:
    image: static-server:latest
    container_name: static-server
    ports:
      - "3001:3001"
    networks:
      - n8n-network  # USE THE SAME NETWORK NAME AS YOUR OTHER SERVICES
    volumes:
      - ~/Desktop/instagram-slides:/root/Desktop/instagram-slides
    depends_on:
      - cloudflared
    restart: unless-stopped
```

**Important Notes:**
- **Network name**: Change `n8n-network` to match your existing network
- **Cloudflared name**: If your cloudflared service has a different name, update `depends_on`
- **Volume path**: Adjust `~/Desktop/instagram-slides` if you want images saved elsewhere

## Step 3: Update Your Cloudflared Service (if needed)

Make sure your cloudflared service:
1. Exposes metrics on port 2000
2. Proxies to static-server on port 3001

**Example cloudflared service:**

```yaml
cloudflared:
  image: cloudflare/cloudflared:latest
  container_name: n8n-cloudflared
  command: tunnel --url http://static-server:3001 --metrics 0.0.0.0:2000
  ports:
    - "2000:2000"
  networks:
    - n8n-network
  restart: unless-stopped
```

**Key parts:**
- `--url http://static-server:3001` → Tunnel proxies to static-server
- `--metrics 0.0.0.0:2000` → Metrics available on port 2000
- Container name should be `n8n-cloudflared` or `cloudflared`

## Step 4: Verify Network Configuration

All three services must be on the **same Docker network**:

```yaml
networks:
  n8n-network:  # Or whatever your network is called
    driver: bridge
```

Each service should have:
```yaml
networks:
  - n8n-network
```

## Step 5: Start Everything

```bash
# Stop old containers
docker-compose down

# Start all services
docker-compose up -d

# Check logs
docker logs static-server -f
```

**What to look for in logs:**
```
📦 Static server running on port 3001
🔄 Auto-initializing tunnel URL from cloudflared...
Attempt 1/30: Fetching from http://n8n-cloudflared:2000/metrics
✅ Found tunnel URL: https://abc123xyz.trycloudflare.com
✅ Auto-initialization successful!
🎉 Static server is ready to serve public URLs
```

## Step 6: Test Connectivity

### From your terminal:

```bash
# Test static-server health
curl http://localhost:3001/health

# Should return:
# {
#   "status": "ready",
#   "configured": true,
#   "tunnelUrl": "https://...trycloudflare.com",
#   ...
# }
```

### From inside Docker:

```bash
# Run diagnostic script
docker exec -it static-server node test-connectivity.js
```

### From n8n:

Create a test workflow with one HTTP Request node:
- **Method:** GET
- **URL:** `http://static-server:3001/health`
- Execute and check response

## Step 7: Update Your n8n Workflow

Follow the updated instructions in `N8N_SOCIAL_WOTD.md`:

1. Replace the old 3-node setup with the new smart detection flow
2. Node 6: Check Tunnel Status
3. Node 6a: IF configured = false → manual setup, else → skip to Split Out

## Troubleshooting

### "Auto-initialization failed" in logs

**Possible causes:**
1. Cloudflared not started yet → Wait 30-60 seconds
2. Wrong container name → Check `docker ps` for actual name
3. Different network → Verify all services on same network
4. Cloudflared not exposing metrics → Check cloudflared command

**Solution:**
```bash
# Check what networks exist
docker network ls

# Inspect your network
docker network inspect n8n-network

# Verify all 3 services are listed
# If not, add them to the network
```

### n8n can't reach static-server

**Test from n8n:**
- Create HTTP Request node
- URL: `http://static-server:3001/health`
- Execute

**If it fails:**
1. Check n8n is on same Docker network
2. Try container IP instead of hostname
3. Check firewall/security settings

### Cloudflared shows different container name

**If your container is just called `cloudflared` instead of `n8n-cloudflared`:**

The static-server will try both! It attempts:
- `http://n8n-cloudflared:2000/metrics`
- `http://cloudflared:2000/metrics`

Both will work automatically.

### Images not saving

**Check volume mount:**
```bash
docker exec -it static-server ls -la ~/Desktop/instagram-slides
```

**If directory doesn't exist:**
- Check volume path in docker-compose.yml
- Make sure `~/Desktop/instagram-slides` exists on host

## Manual Testing

### Test cloudflared metrics:

```bash
curl http://localhost:2000/metrics
# Should show Prometheus-style metrics with tunnel URL
```

### Test tunnel URL extraction:

```bash
curl http://localhost:2000/metrics | grep -o 'https://[a-z0-9-]*\.trycloudflare\.com'
```

### Test static-server endpoint:

```bash
curl http://localhost:3001/tunnel-status
```

## Success Checklist

- [ ] Static-server container running (`docker ps | grep static-server`)
- [ ] Health check shows "ready" (`curl localhost:3001/health`)
- [ ] Tunnel URL is configured (check `/tunnel-status`)
- [ ] n8n can reach static-server (test with HTTP Request node)
- [ ] Images directory is mounted and accessible
- [ ] All services on same Docker network

## Next Steps

Once everything is working:
1. Update your n8n workflow with the new nodes
2. Test the full Instagram post generation flow
3. Enjoy automatic tunnel detection on every restart! 🎉

## Need Help?

Common issues:
- **Network isolation**: All services must be on same Docker network
- **Container names**: Match the names in code to actual container names
- **Timing**: Cloudflared may take 10-30 seconds to establish tunnel
- **Ports**: Make sure 2000 and 3001 are not already in use

Run the diagnostic script for detailed troubleshooting:
```bash
docker exec -it static-server node test-connectivity.js
```




