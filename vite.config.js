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
          // Split dictionary data into its own chunk (it's very large)
          if (id.includes('data/dictionary/words/cambridge') || 
              id.includes('DictionaryModal') ||
              id.includes('useDictionary') ||
              id.includes('useDictionaryData') ||
              id.includes('useDictionarySearch') ||
              id.includes('registry')) {
            return 'dictionary';
          }
          // Split react-force-graph into its own chunk (it's large)
          if (id.includes('react-force-graph')) {
            return 'force-graph';
          }
          // Split Clerk auth library
          if (id.includes('@clerk')) {
            return 'clerk';
          }
          // Split Supabase library
          if (id.includes('@supabase')) {
            return 'supabase';
          }
          // Split React Query
          if (id.includes('@tanstack/react-query')) {
            return 'react-query';
          }
          // Split other large node_modules into vendor chunk
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
  },
});

