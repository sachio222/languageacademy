// HTML to Image Service using Puppeteer
// Deploy to Vercel, Railway, Render, or any Node.js host

const express = require('express');
const puppeteer = require('puppeteer');
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json({ limit: '10mb' }));

// Create output directory
const outputDir = path.join(require('os').homedir(), 'Desktop', 'instagram-slides');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// HTML to Image endpoint
app.post('/api/html-to-image', async (req, res) => {
  let browser;
  
  try {
    const { html, width = 1080, height = 1080 } = req.body;
    
    if (!html) {
      return res.status(400).json({ 
        success: false, 
        error: 'HTML is required' 
      });
    }

    // Launch browser
    browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu'
      ]
    });

    const page = await browser.newPage();
    
    // Set viewport
    await page.setViewport({ 
      width: parseInt(width), 
      height: parseInt(height) 
    });

    // Set content
    await page.setContent(html, { 
      waitUntil: 'networkidle0' 
    });

    // Take screenshot
    const screenshot = await page.screenshot({
      type: 'png',
      fullPage: false
    });

    await browser.close();

    // Convert to base64
    const base64 = screenshot.toString('base64');
    const buffer = screenshot;
    
    // Save to disk with slide number, word, and date
    const word = req.body.word || 'slide';
    const slideNumber = req.body.slideNumber || req.body.slide_number || '0';
    const date = req.body.date || new Date().toISOString().split('T')[0];
    const fileName = `${date}-${word}-slide-${slideNumber}.png`;
    const filePath = path.join(outputDir, fileName);
    
    fs.writeFileSync(filePath, buffer);
    console.log(`✅ Saved image to: ${filePath}`);

    // Optionally upload to Supabase Storage if credentials provided
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const uploadToStorage = req.body.upload_to_storage === true && supabaseUrl && supabaseKey;

    if (uploadToStorage) {
      const supabase = createClient(supabaseUrl, supabaseKey);
      const fileName = `instagram-slide-${Date.now()}-${Math.random().toString(36).substring(7)}.png`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('instagram-slides') // Create this bucket in Supabase Storage
        .upload(fileName, buffer, {
          contentType: 'image/png',
          upsert: false
        });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        // Fall back to base64
        return res.json({
          success: true,
          url: `data:image/png;base64,${base64}`,
          image: base64,
          upload_error: uploadError.message
        });
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('instagram-slides')
        .getPublicUrl(fileName);

      return res.json({
        success: true,
        url: urlData.publicUrl,
        image: base64 // Also return base64 as fallback
      });
    }

    // Return both base64 and file path
    res.json({
      success: true,
      url: `data:image/png;base64,${base64}`,
      image: base64,
      filePath: filePath,
      fileName: fileName,
      savedTo: outputDir
    });

  } catch (error) {
    console.error('Error generating image:', error);
    
    if (browser) {
      await browser.close();
    }
    
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`HTML to Image service running on port ${PORT}`);
});

