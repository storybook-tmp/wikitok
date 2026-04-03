import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { StorybookConfig } from '@storybook/react-vite';

const dirname =
  typeof __dirname !== 'undefined'
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)', './eval-support/*.mdx'],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-onboarding',
  ],
  framework: '@storybook/react-vite',
  async viteFinal(config) {
    const existingAlias = config.resolve?.alias ?? [];
    const analyticsAlias = {
      find: '@vercel/analytics/react',
      replacement: path.resolve(dirname, './vercel-analytics-mock.tsx'),
    };

    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: Array.isArray(existingAlias)
          ? [...existingAlias, analyticsAlias]
          : {
              ...existingAlias,
              '@vercel/analytics/react': analyticsAlias.replacement,
            },
      },
    };
  },
};

export default config;
