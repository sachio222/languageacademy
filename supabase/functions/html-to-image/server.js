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
    
    // Base folder name: date-word
    const baseFolderName = `${date}-${word}`;
    
    // Strategy: Always try base folder first. If it exists and is complete, find next available.
    // All slides in same batch will use same folder name, so they'll naturally group together.
    let wordFolder = path.join(outputDir, baseFolderName);
    let counter = 0;
    
    // Check if base folder exists and is complete
    if (fs.existsSync(wordFolder)) {
      const slide1Path = path.join(wordFolder, 'slide-1.png');
      const slide2Path = path.join(wordFolder, 'slide-2.png');
      const slide3Path = path.join(wordFolder, 'slide-3.png');
      const slide4Path = path.join(wordFolder, 'slide-4.png');
      
      // If all 4 slides exist, this batch is complete - find next available folder
      if (fs.existsSync(slide1Path) && fs.existsSync(slide2Path) && 
          fs.existsSync(slide3Path) && fs.existsSync(slide4Path)) {
        counter = 1;
        wordFolder = path.join(outputDir, `${baseFolderName}-${counter}`);
        
        // Keep incrementing until we find an incomplete or non-existent folder
        while (fs.existsSync(wordFolder)) {
          const testSlide1 = path.join(wordFolder, 'slide-1.png');
          const testSlide2 = path.join(wordFolder, 'slide-2.png');
          const testSlide3 = path.join(wordFolder, 'slide-3.png');
          const testSlide4 = path.join(wordFolder, 'slide-4.png');
          
          // If this folder is also complete, try next
          if (fs.existsSync(testSlide1) && fs.existsSync(testSlide2) && 
              fs.existsSync(testSlide3) && fs.existsSync(testSlide4)) {
            counter++;
            wordFolder = path.join(outputDir, `${baseFolderName}-${counter}`);
          } else {
            // Found incomplete folder, use it
            break;
          }
        }
      }
      // If base folder exists but is incomplete, use it (all slides will use same base name)
    }
    
    // Create folder if it doesn't exist
    if (!fs.existsSync(wordFolder)) {
      fs.mkdirSync(wordFolder, { recursive: true });
    }
    
    // Simple filename inside the folder
    const fileName = `slide-${slideNumber}.png`;
    const filePath = path.join(wordFolder, fileName);
    
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

