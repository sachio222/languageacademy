# Static Server with Cloudflared Auto-Detection

This service automatically detects the Cloudflare tunnel URL and serves images with public URLs.

## Features

- ✅ **Auto-detects cloudflared tunnel URL** on startup (with retry logic)
- ✅ **Fallback to manual configuration** if auto-detection fails
- ✅ **Health checks** to verify readiness
- ✅ **Serves static images** from Desktop/instagram-slides directory

## Docker Setup

### Add to your docker-compose.yml:

```yaml
services:
  static-server:
    build: ./path/to/static-server
    container_name: static-server
    ports:
      - "3001:3001"
    networks:
      - n8n-network
    volumes:
      - ~/Desktop/instagram-slides:/root/Desktop/instagram-slides
    depends_on:
      - cloudflared
    restart: unless-stopped
```

**Important:** Make sure `static-server` is on the same Docker network as `n8n-cloudflared` (or `cloudflared`).

## Endpoints

### GET /health
Returns server status and tunnel configuration state.

**Response:**
```json
{
  "status": "ready",
  "configured": true,
  "tunnelUrl": "https://abc123.trycloudflare.com",
  "autoInitAttempted": true,
  "autoInitSucceeded": true,
  "lastError": null,
  "uptime": 45.2,
  "timestamp": "2025-11-13T10:30:00.000Z"
}
```

### GET /tunnel-status
Quick check if tunnel URL is configured.

**Response:**
```json
{
  "configured": true,
  "tunnelUrl": "https://abc123.trycloudflare.com",
  "autoInitAttempted": true,
  "autoInitSucceeded": true,
  "lastError": null
}
```

### POST /set-tunnel-url
Manually configure the tunnel URL (fallback for n8n).

**Body:**
```json
{
  "url": "https://abc123.trycloudflare.com"
}
```

**Response:**
```json
{
  "success": true,
  "tunnelUrl": "https://abc123.trycloudflare.com",
  "method": "manual"
}
```

### GET /public-url?path=IMAGE_PATH
Get public URL for an image.

**Example:** `/public-url?path=2025-11-13-tenir/slide-1.png`

**Response:**
```json
{
  "success": true,
  "url": "https://abc123.trycloudflare.com/images/2025-11-13-tenir/slide-1.png",
  "tunnelUrl": "https://abc123.trycloudflare.com"
}
```

## How It Works

1. **On startup**, server attempts to fetch cloudflared metrics from:
   - `http://n8n-cloudflared:2000/metrics`
   - `http://cloudflared:2000/metrics`

2. **Retries up to 30 times** with exponential backoff (1s, 2s, 4s, 8s, 10s...)

3. **Extracts tunnel URL** from metrics using regex

4. **If successful**: Server is ready, `/health` returns `"status": "ready"`

5. **If failed**: Server runs but waits for manual configuration via `/set-tunnel-url`

## Integration with n8n

### Option 1: Let it auto-initialize (recommended)

Add a "Check Tunnel Status" node before image generation:

**Type:** HTTP Request  
**Method:** GET  
**URL:** `http://static-server:3001/tunnel-status`

**Then use an IF node:**
- If `configured === true`: Skip to image generation
- If `configured === false`: Run the manual setup nodes (fetch from cloudflared + set-tunnel-url)

### Option 2: Always use manual setup (current approach)

Keep your existing 3-node setup:
1. Get Tunnel URL from Cloudflared
2. Extract and Set Tunnel URL
3. Set Tunnel URL in Static Server

The server will still try to auto-init, but your manual setup will override it if needed.

## Troubleshooting

### Server logs "Auto-initialization failed"
**Cause:** Can't reach cloudflared service

**Solutions:**
1. Verify both services are on same Docker network
2. Check cloudflared container name (should be `n8n-cloudflared` or `cloudflared`)
3. Wait longer - cloudflared may still be starting up
4. Use manual configuration from n8n

### Health check shows "status": "waiting"
**Cause:** Tunnel URL not yet configured

**Solutions:**
1. Wait up to 60 seconds for auto-init
2. Check `/health` endpoint for `lastError` details
3. Manually configure via `/set-tunnel-url`

### n8n can't reach static-server
**Cause:** Network isolation

**Solutions:**
1. Verify n8n and static-server are on same Docker network
2. Try accessing from n8n: `http://static-server:3001/health`
3. Check docker-compose network configuration





