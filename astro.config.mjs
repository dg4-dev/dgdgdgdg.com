import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import { notionImages } from './src/integrations/notion-images';

// https://astro.build/config
export default defineConfig({
  adapter: cloudflare({ imageService: 'compile' }),
  output: 'server',
  integrations: [notionImages()],
});
