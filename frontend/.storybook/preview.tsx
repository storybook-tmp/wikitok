import '../src/index.css';

import type { Preview } from '@storybook/react-vite';
import { LikedArticlesProvider } from '../src/contexts/LikedArticlesContext';

installBrowserShims();

const preview: Preview = {
  decorators: [
    (Story) => (
      <LikedArticlesProvider>
        <Story />
      </LikedArticlesProvider>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
  },
};

function installBrowserShims() {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    Object.defineProperty(navigator, 'share', {
      configurable: true,
      value: navigator.share ?? (async () => undefined),
    });
  } catch {
    // Ignore locked browser APIs in test environments.
  }

  try {
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value:
        navigator.clipboard ??
        ({
          writeText: async () => undefined,
        } satisfies Pick<Clipboard, 'writeText'>),
    });
  } catch {
    // Ignore locked browser APIs in test environments.
  }

  if (!window.alert) {
    window.alert = () => undefined;
  }
}

export default preview;
