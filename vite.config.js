import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    // Ensure CSS is extracted and minified in production
    cssCodeSplit: true,
    cssMinify: true,
    // Ensure CSS assets are properly referenced
    rollupOptions: {
      output: {
        // Ensure CSS files are named consistently
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'assets/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
        // Manual chunking to split vendor libraries
        manualChunks: (id) => {
          // DON'T split dictionary - it has circular dependency issues when code-split
          // Let it stay in main bundle for now
          
          // Split react-force-graph into its own chunk (it's large)
          if (id.includes('react-force-graph')) {
            return 'force-graph';
          }
          // DON'T split Clerk - it has internal circular deps that break when code-split
          // Keep it in vendor chunk with React
          
          // Split Supabase library
          if (id.includes('@supabase')) {
            return 'supabase';
          }
          // Split React Query
          if (id.includes('@tanstack/react-query')) {
            return 'react-query';
          }
          // Split other large node_modules into vendor chunk (includes Clerk and React)
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
  },
});

