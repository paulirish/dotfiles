import { defineConfig } from 'vite';

export default defineConfig({
  // Perfect Types CSP applied in preview/production (not dev, where Vite HMR uses innerHTML).
  preview: {
    headers: {
      'Content-Security-Policy': "require-trusted-types-for 'script'; trusted-types 'none';",
    },
  },
});
