// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  optimizeDeps: {
    include: ['@emotion/react', '@mui/material', '@mui/styled-engine']
  }
});
