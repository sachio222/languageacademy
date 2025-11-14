# Pinterest API Upload Node

## Node: Upload Pin to Pinterest (HTTP Request)

**Type:** HTTP Request  
**Method:** POST  
**URL:** `https://api.pinterest.com/v5/pins`

**Authentication:** OAuth 2.0  
(You'll need to set up Pinterest OAuth credential in n8n - see setup guide below)

---

## Request Body (JSON)

```json
{
  "title": "{{ $json.title }}",
  "description": "{{ $json.description }}",
  "link": "{{ $json.link }}",
  "alt_text": "{{ $json.alt_text }}",
  "note": "{{ $json.note }}",
  "board_id": "YOUR_BOARD_ID_HERE",
  "media_source": {
    "source_type": "image_url",
    "url": "{{ $json.image_url }}"
  }
}
```

**Notes:**

- ✅ The `image_url` is a **public HTTPS URL** (e.g., `https://abc123.trycloudflare.com/images/...`)
- ✅ Pinterest API **requires publicly accessible URLs** (not base64) - this is exactly what we provide
- ✅ Same infrastructure as Instagram: html-to-image service → static-server → cloudflared tunnel → public URL
- ✅ The base64 is only used internally between services; Pinterest receives the public URL
- The `note` field helps Pinterest categorize your pin internally (doesn't display to users).
- **Pinterest Best Practice**: Use 3-5 hashtags maximum (quality over quantity). Too many hashtags = spam.
- Keywords are naturally integrated into description (not stuffed) for organic algorithm boost.
- Pinterest prioritizes quality content and user value over keyword optimization.

---

## Headers

```json
{
  "Authorization": "Bearer {{ $credentials.pinterest_oauth.access_token }}",
  "Content-Type": "application/json"
}
```

---

## Response

Pinterest API returns:

```json
{
  "id": "123456789012345678",
  "created_at": "2025-11-16T10:30:00",
  "link": "https://languageacademy.io/?wotd=true&word=dormir-fr",
  "title": "French Word: dormir | Learn \"to sleep\" in French | A2",
  "description": "Learn the French verb \"dormir\"...",
  "board_id": "987654321098765432",
  "media": {
    "images": {
      "150x150": { "url": "...", "width": 150, "height": 150 },
      "400x300": { "url": "...", "width": 400, "height": 300 },
      "600x": { "url": "...", "width": 600, "height": 900 },
      "1200x": { "url": "...", "width": 1200, "height": 1800 }
    }
  }
}
```

The `id` field is your Pinterest Pin ID - save this if you want to track analytics later!

**Pin Visibility:**

- ✅ Pin created successfully (you got a pin ID)
- ⏱️ **Processing delay:** Pinterest can take 2-5 minutes to process and display pins
- 🔍 **Check your board:** Go to your Pinterest board directly (not your profile)
- 📍 **Direct pin URL:** `https://www.pinterest.com/pin/{pin_id}/` (replace `{pin_id}` with your actual pin ID)

**If pin doesn't appear after 5 minutes:**

1. Verify pin exists: `GET https://api.pinterest.com/v5/pins/{pin_id}`
2. Check board visibility (must be public for others to see)
3. Check Pinterest account type (business accounts may have different visibility)

---

## Pinterest OAuth Setup (n8n Credentials)

### Step 1: Create Pinterest App

1. Go to [Pinterest Developers](https://developers.pinterest.com/apps/)
2. Click **"Create app"**
3. Fill in details:
   - **App name:** Language Academy WOTD
   - **Description:** Automated daily French vocabulary pins
   - **Redirect URI:** `https://YOUR_N8N_URL/rest/oauth2-credential/callback`
   - **Scopes:** Select these permissions (REQUIRED):
     - ✅ `pins:write` (**REQUIRED** - to create pins)
     - ✅ `boards:write` (**REQUIRED** - to add pins to boards)
     - ✅ `boards:read` (recommended - to list boards)
     - ✅ `pins:read` (optional - for analytics)
4. Click **"Create"**
5. Copy your **App ID** and **App Secret**

### Step 2: Get Board ID

**Option A: Use Pinterest API Explorer**

1. Go to [Pinterest API Explorer](https://developers.pinterest.com/tools/api-explorer/)
2. Authenticate with your Pinterest account
3. Try endpoint: `GET /v5/boards`
4. Find your "French Word of the Day" board in the response
5. Copy the `id` field (e.g., `"987654321098765432"`)

**Option B: Use n8n HTTP Request node**

Add a temporary node to your workflow:

**URL:** `https://api.pinterest.com/v5/boards`  
**Method:** GET  
**Headers:**

```json
{
  "Authorization": "Bearer {{ $credentials.pinterest_oauth.access_token }}"
}
```

Execute and copy the board ID from the response.

### Step 3: Add OAuth Credential to n8n

1. In n8n, go to **Credentials** → **Add Credential**
2. Search for **"Pinterest OAuth2 API"**
3. If not available, use **"OAuth2 API"** (generic)
4. Configure:
   - **Credential Name:** `pinterest_oauth`
   - **Grant Type:** Authorization Code
   - **Authorization URL:** `https://www.pinterest.com/oauth/`
   - **Access Token URL:** `https://api.pinterest.com/v5/oauth/token`
   - **Client ID:** Your Pinterest App ID
   - **Client Secret:** Your Pinterest App Secret
   - **Scope:** `pins:write,boards:write,boards:read` (**IMPORTANT:** Must include `boards:write`!)
   - **Auth URI Query Parameters:** (leave empty)
   - **Authentication:** Header
5. Click **"Connect my account"**
6. Authorize the app in Pinterest
7. Save

**Important Token Info:**

- **Access Token:** Valid for 30 days (n8n auto-refreshes)
- **Refresh Token:** Valid for 365 days (long-lived)
- **n8n handles refresh automatically** - you shouldn't need to reauthenticate

**If your token is expiring in 1 hour:**

- ❌ You might be using a temporary test token from Pinterest API Explorer
- ❌ You might not have OAuth set up correctly
- ✅ **Solution:** Follow Step 3 above to set up proper OAuth 2.0 in n8n
- ✅ n8n will automatically use the refresh token to get new access tokens

**Can I use the App Secret instead?**

- ❌ NO - App Secret is only used during OAuth setup
- ❌ NEVER send App Secret in API requests (security risk)
- ✅ Use the access token that n8n manages for you via OAuth

---

## Complete Workflow Node Order

```
1. When Executed by Another Workflow (Trigger)
   ↓
2. Get Used Images from Airtable
   ↓
3. Get Pexels Image (HTTP Request)
   ↓
4. Filter Out Used Images (Code)
   ↓
5. Store Image in Airtable (mark as "both" for Instagram + Pinterest)
   ↓
6. Generate Pinterest Pin HTML (Code - use pinterest-pin-template.js)
   ↓
7. Check Tunnel Status (same as Instagram)
   ↓
8. Convert HTML to Image (HTTP Request to html-to-image service)
   ↓ (Returns public URL via cloudflared tunnel)
9. Generate Pin Metadata (Code - use pinterest-metadata-template.js)
   ↓
10. Upload Pin to Pinterest (HTTP Request - this node!)
   ↓
✅ Pin is live on Pinterest!
```

---

## Testing the Upload

**Before running the full workflow, test manually:**

### Test 1: Verify Authentication

**Node:** HTTP Request  
**URL:** `https://api.pinterest.com/v5/user_account`  
**Method:** GET  
**Headers:**

```json
{
  "Authorization": "Bearer {{ $credentials.pinterest_oauth.access_token }}"
}
```

**Expected Response:**

```json
{
  "username": "yourusername",
  "account_type": "BUSINESS",
  "profile_image": "...",
  "website_url": "https://languageacademy.io"
}
```

If you get `401 Unauthorized`, your OAuth setup needs fixing.

### Test 2: List Boards

**URL:** `https://api.pinterest.com/v5/boards`

Verify you can see your "French Word of the Day" board and get its ID.

### Test 3: Create Test Pin

Use a static image URL to test pin creation:

```json
{
  "title": "Test Pin - French WOTD",
  "description": "Testing Pinterest API integration",
  "link": "https://languageacademy.io",
  "board_id": "YOUR_BOARD_ID",
  "media_source": {
    "source_type": "image_url",
    "url": "https://i.pinimg.com/originals/8d/2c/b3/8d2cb3e7f24b4b7e9b5f6e7a8c9d0e1f.jpg"
  }
}
```

If this works, you're ready to integrate with the workflow!

---

## Error Handling

**Common Pinterest API Errors:**

### 1. `400 Bad Request: Invalid image URL`

**Cause:** Pinterest couldn't fetch your image  
**Fix:**

- Verify your cloudflared tunnel is public and accessible
- Test the image URL in a browser (should download immediately)
- Pinterest requires HTTPS URLs
- Image must be accessible within ~10 seconds

**Solution:** Add retry logic or check tunnel status before upload

### 2. `401 Unauthorized`

**Cause:** OAuth token expired or invalid  
**Fixes:**

1. **If using OAuth 2.0 in n8n (recommended):**
   - Click "Reconnect" in your Pinterest OAuth credential
   - n8n will automatically refresh the token
2. **If token expires in 1 hour (test token issue):**

   - You're likely using a temporary token from Pinterest API Explorer
   - **Solution:** Set up proper OAuth 2.0 in n8n (see Step 3 in setup section)
   - OAuth tokens last 30 days and auto-refresh

3. **If using manual access token:**
   - ❌ Don't do this! Use OAuth 2.0 instead
   - Manual tokens expire and require manual refresh
   - OAuth handles this automatically

### 3. `429 Too Many Requests`

**Cause:** Rate limit exceeded (1000 pins/day, 10 req/sec)  
**Fix:** Add delay between pins if posting in bulk

### 4. `422 Unprocessable Entity: Invalid board_id`

**Cause:** Board doesn't exist or you don't have access  
**Fix:** Verify board_id by listing boards (see Step 2 above)

---

## Rate Limits & Best Practices

**Pinterest API Limits:**

- **Max pins per day:** 1000 (you're posting 1/day = well within limit)
- **Max requests per second:** 10
- **Image size:** Max 32MB, min 100x100, recommended 1000x1500
- **Image format:** JPG, PNG, WebP

**Best Practices:**

1. **Always use HTTPS image URLs** (cloudflared provides this automatically)
2. **Include alt_text** (boosts SEO + accessibility)
3. **Use descriptive titles** (front-load keywords)
4. **Rich descriptions** (150-500 chars optimal)
5. **Link to valuable content** (your WOTD pages = perfect!)
6. **Post consistently** (daily = best for Pinterest algorithm)
7. **Monitor saves/impressions** (adjust strategy based on what pins perform best)

---

## Analytics Tracking (Optional)

Pinterest provides rich analytics. To track your WOTD pins:

### Option 1: Pinterest Analytics Dashboard

1. Go to [Pinterest Analytics](https://analytics.pinterest.com/)
2. View performance by:
   - **Impressions** (how many times seen)
   - **Saves** (how many users saved to their boards)
   - **Clicks** (clicks to your WOTD page)
   - **Close-ups** (users zoomed in to read)

### Option 2: Pinterest API Analytics

**Endpoint:** `GET /v5/pins/{pin_id}/analytics`

Add this as a follow-up workflow that runs weekly to collect metrics:

```json
{
  "start_date": "2025-11-01",
  "end_date": "2025-11-30",
  "metric_types": ["IMPRESSION", "SAVE", "PIN_CLICK", "OUTBOUND_CLICK"]
}
```

**Response:**

```json
{
  "all": {
    "daily_metrics": [
      {
        "data_status": "READY",
        "date": "2025-11-16",
        "metrics": {
          "IMPRESSION": 1247,
          "SAVE": 34,
          "PIN_CLICK": 89,
          "OUTBOUND_CLICK": 23
        }
      }
    ]
  }
}
```

This lets you identify which words/images get the most saves!

---

## Comparing Results: Instagram vs Pinterest

After 30 days, compare:

| Metric                  | Instagram                 | Pinterest                       |
| ----------------------- | ------------------------- | ------------------------------- |
| **Engagement**          | Likes + Comments          | Saves + Repins                  |
| **Traffic**             | Profile visits            | Outbound clicks (to WOTD pages) |
| **Lifespan**            | 48 hours                  | 3-6 months+                     |
| **Conversion Tracking** | Limited (bio link only)   | Direct (unique URL per pin)     |
| **Algorithm**           | Recency-based (dies fast) | Evergreen (resurfaces)          |
| **Best Performer**      | Visually striking words   | Information-dense words         |

**Expected Results:**

- Instagram: Higher immediate engagement (likes, comments, shares)
- Pinterest: Higher cumulative clicks (traffic to your site over time)

**Winner for signups?** Likely Pinterest (direct links + long lifespan = more touchpoints)

---

## Troubleshooting Checklist

Before asking for help, verify:

- [ ] Pinterest Business Account created
- [ ] Pinterest App created with correct scopes (`pins:write`, `boards:read`)
- [ ] OAuth credential in n8n is connected (green checkmark)
- [ ] Board exists and you have the correct `board_id`
- [ ] Image URL is publicly accessible via HTTPS (test in browser)
- [ ] HTML-to-image service is generating 1000x1500 images
- [ ] Cloudflared tunnel is running and auto-configured
- [ ] n8n can reach `http://static-server:3001` (same Docker network)

---

## Next: Update the Strategy Doc

I'll add this upload node documentation to the main Pinterest strategy guide!
