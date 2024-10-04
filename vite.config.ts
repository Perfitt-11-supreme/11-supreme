import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import viteCompression from 'vite-plugin-compression';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), vanillaExtractPlugin(), viteCompression()],
  server: {
    proxy: {
      '/api': {
        target: 'https://e035c336-46ca-4e92-9206-6fc8d219b701.mock.pstmn.io/api',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },
});
