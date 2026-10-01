import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import { notionImages } from './src/integrations/notion-images';

// https://astro.build/config
export default defineConfig({
  // ビルド時に作るページの Astro.url は、これがないと http://localhost:4321 になる（og:url・og:image に使う）
  site: 'https://dgdgdgdg.com',
  adapter: cloudflare({ imageService: 'passthrough' }),
  output: 'server',
  integrations: [notionImages()],
});
