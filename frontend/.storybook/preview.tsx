import type { Preview } from '@storybook/react-vite';

import '../src/index.css';

import { LikedArticlesProvider } from '../src/contexts/LikedArticlesContext';

class MockIntersectionObserver implements IntersectionObserver {
  readonly root = null;
  readonly rootMargin = '0px';
  readonly thresholds = [0];

  disconnect() {}

  observe() {}

  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }

  unobserve() {}
}

function replaceProperty<T extends object>(
  target: T,
  key: PropertyKey,
  value: unknown,
) {
  const descriptor = Object.getOwnPropertyDescriptor(target, key);

  Object.defineProperty(target, key, {
    configurable: true,
    writable: true,
    value,
  });

  return () => {
    if (descriptor) {
      Object.defineProperty(target, key, descriptor);
      return;
    }

    Reflect.deleteProperty(target, key);
  };
}

const preview: Preview = {
  decorators: [
    (Story, context) => {
      if (context.parameters.withLikedArticlesProvider === false) {
        return <Story />;
      }

      return (
        <LikedArticlesProvider>
          <Story />
        </LikedArticlesProvider>
      );
    },
  ],
  beforeEach: () => {
    localStorage.clear();

    const restoreShare = replaceProperty(
      navigator,
      'share',
      async () => undefined,
    );
    const restoreClipboard = replaceProperty(navigator, 'clipboard', {
      writeText: async () => undefined,
    });
    const restoreAlert = replaceProperty(window, 'alert', () => undefined);
    const restoreIntersectionObserver = replaceProperty(
      window,
      'IntersectionObserver',
      MockIntersectionObserver,
    );

    return () => {
      localStorage.clear();
      restoreIntersectionObserver();
      restoreAlert();
      restoreClipboard();
      restoreShare();
    };
  },
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

export default preview;
