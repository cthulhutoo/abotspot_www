import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://abotspot.com',
  output: 'static',
  integrations: [tailwind()],
  adapter: vercel(),
  compressHTML: true,
  build: {
    format: 'file',
  },
});
