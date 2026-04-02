import type { Preview } from '@storybook/react-vite';

import '../src/index.css';
import '../src/styles/Article.css';

import { LikedArticlesProvider } from '../src/contexts/LikedArticlesContext';

type StoryParameters = {
  language?: string;
  likedArticles?: unknown[];
};

const preview: Preview = {
  decorators: [
    (Story, context) => {
      const { language, likedArticles } = context.parameters as StoryParameters;

      if (language) {
        localStorage.setItem('lang', language);
      } else {
        localStorage.removeItem('lang');
      }

      if (likedArticles) {
        localStorage.setItem('likedArticles', JSON.stringify(likedArticles));
      } else {
        localStorage.removeItem('likedArticles');
      }

      return (
        <LikedArticlesProvider>
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
