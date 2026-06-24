import type { Preview } from '@storybook/react-vite';
import type { ReactNode } from 'react';

import '../src/index.css';

import type { WikiArticle } from '../src/components/WikiCard';
import { LikedArticlesProvider } from '../src/contexts/LikedArticlesContext';

type StoryParameters = {
  initialLanguage?: string;
  initialLikedArticles?: WikiArticle[];
};

function StorybookProviders({
  children,
  initialLanguage = 'en',
  initialLikedArticles = [],
}: {
  children: ReactNode;
  initialLanguage?: string;
  initialLikedArticles?: WikiArticle[];
}) {
  localStorage.setItem('lang', initialLanguage);
  localStorage.setItem('likedArticles', JSON.stringify(initialLikedArticles));

  return <LikedArticlesProvider>{children}</LikedArticlesProvider>;
}

const preview: Preview = {
  decorators: [
    (Story, context) => {
      const parameters = context.parameters as StoryParameters;

      return (
        <StorybookProviders
          initialLanguage={parameters.initialLanguage}
          initialLikedArticles={parameters.initialLikedArticles}
        >
          <Story />
        </StorybookProviders>
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
