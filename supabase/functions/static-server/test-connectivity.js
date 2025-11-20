#!/usr/bin/env node

// Diagnostic script to test connectivity between Docker services
// Run this INSIDE the static-server container: docker exec -it static-server node test-connectivity.js

console.log('🔍 Testing connectivity to cloudflared...\n');

async function testConnectivity() {
  const endpoints = [
    'http://n8n-cloudflared:2000/metrics',
    'http://cloudflared:2000/metrics',
    'http://localhost:2000/metrics',
  ];
  
  let successCount = 0;
  let tunnelUrl = null;
  
  for (const endpoint of endpoints) {
    try {
      console.log(`Testing: ${endpoint}`);
      
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 3000);
      
      const response = await fetch(endpoint, { signal: controller.signal });
      clearTimeout(timeout);
      
      if (response.ok) {
        const text = await response.text();
        const match = text.match(/https:\/\/[a-z0-9-]+\.trycloudflare\.com/);
        
        console.log(`  ✅ SUCCESS - HTTP ${response.status}`);
        
        if (match) {
          tunnelUrl = match[0];
          console.log(`  🎉 Found tunnel URL: ${tunnelUrl}`);
        } else {
          console.log(`  ⚠️  Metrics received but no tunnel URL found yet`);
        }
        
        successCount++;
      } else {
        console.log(`  ❌ FAILED - HTTP ${response.status}`);
      }
    } catch (err) {
      if (err.name === 'AbortError') {
        console.log(`  ❌ TIMEOUT - No response after 3 seconds`);
      } else {
        console.log(`  ❌ ERROR - ${err.message}`);
      }
    }
    
    console.log('');
  }
  
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('RESULTS:');
  console.log(`  Successful connections: ${successCount}/${endpoints.length}`);
  console.log(`  Tunnel URL found: ${tunnelUrl ? 'YES' : 'NO'}`);
  
  if (successCount === 0) {
    console.log('\n❌ NO CONNECTIONS SUCCESSFUL');
    console.log('\nTroubleshooting:');
    console.log('  1. Check that cloudflared container is running:');
    console.log('     docker ps | grep cloudflared');
    console.log('  2. Check that both containers are on the same network:');
    console.log('     docker network inspect n8n-network');
    console.log('  3. Check cloudflared container name matches endpoint:');
    console.log('     docker ps --format "{{.Names}}" | grep cloud');
    console.log('  4. Check cloudflared logs:');
    console.log('     docker logs n8n-cloudflared');
  } else if (!tunnelUrl) {
    console.log('\n⚠️  Connection successful but no tunnel URL yet');
    console.log('  Cloudflared may still be establishing the tunnel.');
    console.log('  Wait 10-30 seconds and try again.');
  } else {
    console.log(`\n✅ ALL GOOD! Tunnel URL: ${tunnelUrl}`);
  }
  
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

testConnectivity().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});





