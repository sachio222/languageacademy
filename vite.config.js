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
      },
    },
  },
});

