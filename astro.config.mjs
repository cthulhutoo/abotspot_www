import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://abotspot.com',
  integrations: [tailwind()],
  compressHTML: true,
  build: {
    format: 'file',
  },
});
