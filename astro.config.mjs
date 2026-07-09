// @ts-check
import { defineConfig } from 'astro/config';
import site from './site.config.mjs';

export default defineConfig({
  site: `https://${site.githubUser}.github.io`,
  base: `/${site.repository}`,
  build: {
    format: 'directory',
  },
});
