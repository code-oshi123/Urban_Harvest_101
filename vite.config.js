import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  // Ensure all HTML entry points are included in the build
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        about: 'about.html',
        subscribe: 'subscribe.html',
        products: 'products.html',
        community: 'community.html',
        404: '404.html',
      },
    },
  },
})