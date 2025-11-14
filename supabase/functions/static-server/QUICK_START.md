# Static Server - Quick Start

## TL;DR

This service automatically detects your Cloudflare tunnel URL when Docker starts. No more manual configuration in n8n!

## 1-Minute Setup

```bash
# 1. Build the image
cd supabase/functions/static-server
docker build -t static-server:latest .

# 2. Add to your docker-compose.yml (see docker-compose.snippet.yml)

# 3. Start it
docker-compose up -d static-server

# 4. Check status
curl http://localhost:3001/health
```

**Expected output:**
```json
{
  "status": "ready",
  "configured": true,
  "tunnelUrl": "https://abc123.trycloudflare.com",
  "autoInitSucceeded": true
}
```

## Update n8n Workflow

**Before (old way - 3 nodes):**
1. Get Tunnel URL from Cloudflared
2. Extract Tunnel URL
3. Set Tunnel URL in Static Server

**After (new way - 1 node + fallback):**
1. Check Tunnel Status → IF not configured → manual fallback → continue

See `N8N_SOCIAL_WOTD.md` Node 6 for details.

## Test Connectivity

```bash
# From inside the container
docker exec -it static-server node test-connectivity.js
```

## Troubleshooting

**"Auto-initialization failed"**
→ Wait 60 seconds for cloudflared to start, or check `docker logs static-server`

**n8n can't reach it**
→ Make sure all services are on the same Docker network

**Full guide:** See `DOCKER_SETUP_GUIDE.md`


