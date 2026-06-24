import type { Preview } from '@storybook/react-vite';

import '../src/index.css';
import '../src/styles/Article.css';

import { LikedArticlesProvider } from '../src/contexts/LikedArticlesContext';

const originalFetch = globalThis.fetch;
const originalIntersectionObserver = globalThis.IntersectionObserver;

const preview: Preview = {
  decorators: [
    (Story, context) => {
      const likedArticles = context.parameters.likedArticles ?? [];
      const language = context.parameters.language ?? 'en';

      window.localStorage.setItem('likedArticles', JSON.stringify(likedArticles));
      window.localStorage.setItem('lang', language);

      globalThis.fetch = context.parameters.mockFetch ?? originalFetch;
      globalThis.IntersectionObserver =
        context.parameters.mockIntersectionObserver ?? originalIntersectionObserver;

      return (
        <LikedArticlesProvider key={context.id}>
          <Story />
        </LikedArticlesProvider>
      );
    },
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

export default preview;
