# HTML to Image Service (Self-Hosted)

A free, unlimited HTML-to-image converter using Puppeteer. Deploy this to Vercel, Railway, Render, or any Node.js hosting service.

## Setup

### Option A: Deploy to Vercel (Recommended - Free)

1. Create a new directory for this service
2. Copy the files from this directory
3. Deploy to Vercel:
   ```bash
   npm install -g vercel
   vercel
   ```

### Option B: Deploy to Railway (Free Tier Available)

1. Create a new Railway project
2. Connect your GitHub repo
3. Railway will auto-detect and deploy

### Option C: Deploy to Render (Free Tier Available)

1. Create a new Web Service on Render
2. Connect your repo
3. Set build command: `npm install`
4. Set start command: `node server.js`

## Usage in n8n

**Type:** HTTP Request  
**Method:** POST  
**URL:** `YOUR_DEPLOYED_URL/api/html-to-image`

**Body:**
```json
{
  "html": "{{ $json.html }}",
  "width": 1080,
  "height": 1080
}
```

**Response:**
```json
{
  "success": true,
  "url": "https://your-service.com/images/abc123.png"
}
```

## Environment Variables

None required! Works out of the box.

## Cost

- **Vercel:** Free for serverless functions (generous limits)
- **Railway:** Free tier available
- **Render:** Free tier available
- **Self-hosted:** $0 if you have a VPS

