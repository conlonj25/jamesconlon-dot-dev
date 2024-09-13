import { defineConfig } from 'astro/config';
import icon from "astro-icon";
import vercel from '@astrojs/vercel/serverless';

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [icon(), tailwind()],
  output: 'server',
  adapter: vercel({
    webAnalytics: {
      enabled: true
    }
  })
});