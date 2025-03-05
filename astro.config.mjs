// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import icon from 'astro-icon';
import { remarkSandpack } from 'remark-sandpack';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), mdx({ remarkPlugins: [[remarkSandpack, { componentName: 'Sandbox' }]]}), icon()],
  experimental: {
    svg: true,
  },
});