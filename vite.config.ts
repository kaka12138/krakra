import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';

// https://vite.dev/config/
export default defineConfig((commond, mode) => {
  const env = loadEnv(mode, process.cwd())
  return {
    plugins: [tailwindcss(), vue()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      proxy: {
        '/api': {
          //target: process.env.VITE_API_BASE,
          target: env.VITE_API_SERVER,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, ''),
          //secure: false // 如果是https可能需要这个
        },
      },
    },
  }
});
