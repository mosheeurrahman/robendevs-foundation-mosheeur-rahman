import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Requests to /api/... are forwarded to your Express server, so you don't need CORS.
// Change the port to match your backend.
// If your Express app mounts the router at '/api' (app.use('/api', router)),
// delete the `rewrite` line.
export default defineConfig({
  plugins: [react()],
  server: {
      proxy: {
    '/api': {
      target: 'http://localhost:3000',
      changeOrigin: true,
    },
    '/images': {
      target: 'http://localhost:3000',
      changeOrigin: true,
    },
      },
  },
});
