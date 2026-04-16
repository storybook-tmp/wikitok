import '../src/index.css';
import '../src/styles/Article.css';

import type { Preview } from '@storybook/react-vite';
import { LikedArticlesProvider } from '../src/contexts/LikedArticlesContext';

const getSerializedLikedArticles = (likedArticles: unknown) => JSON.stringify(likedArticles);

const preview: Preview = {
  decorators: [
    (Story, context) => {
      window.localStorage.setItem('lang', context.parameters.initialLanguage ?? 'en');

      if (context.parameters.initialLikedArticles === undefined) {
        window.localStorage.removeItem('likedArticles');
      } else {
        window.localStorage.setItem(
          'likedArticles',
          getSerializedLikedArticles(context.parameters.initialLikedArticles),
        );
      }

      if (context.parameters.skipLikedArticlesProvider) {
        return <Story />;
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
