import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';


export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        // Copy past the manifest and icons on dist
        { src: 'manifest.json', dest: '' }, 
        { src: 'icons/*', dest: 'icons' }, 
      ],
    }),
  ],
  build: {
    outDir: 'dist',
  },
});