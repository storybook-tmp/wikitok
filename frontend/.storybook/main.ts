import type { StorybookConfig } from '@storybook/react-vite';
import type { PluginOption } from 'vite';
import tailwindcss from '@tailwindcss/vite';

const config: StorybookConfig = {
  stories: [
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    './eval-support/*.mdx',
  ],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-onboarding',
  ],
  framework: '@storybook/react-vite',
  staticDirs: ['../public'],
  async viteFinal(config) {
    const existingOptimizeDeps = config.optimizeDeps ?? {};
    const existingIncludes = existingOptimizeDeps.include ?? [];

    return {
      ...config,
      plugins: [...withoutPwaPlugins(config.plugins ?? []), tailwindcss()],
      optimizeDeps: {
        ...existingOptimizeDeps,
        include: Array.from(new Set([...existingIncludes, '@vercel/analytics/react'])),
      },
    };
  },
};

export default config;

function withoutPwaPlugins(plugins: PluginOption[]): PluginOption[] {
  return plugins.flatMap((plugin) => {
    if (Array.isArray(plugin)) {
      return withoutPwaPlugins(plugin);
    }

    if (!plugin || typeof plugin !== 'object' || plugin.name?.startsWith('vite-plugin-pwa')) {
      return [];
    }

    return [plugin];
  });
}
