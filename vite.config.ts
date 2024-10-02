import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import viteCompression from 'vite-plugin-compression';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), vanillaExtractPlugin(), viteCompression()],
});
