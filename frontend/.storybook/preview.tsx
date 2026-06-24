import type { Preview } from '@storybook/react-vite';
import type { ReactNode } from 'react';

import '../src/index.css';
import '../src/styles/Article.css';

import type { WikiArticle } from '../src/components/WikiCard';
import { LikedArticlesProvider } from '../src/contexts/LikedArticlesContext';

function StorybookProviders({
  children,
  likedArticles,
  language,
}: {
  children: ReactNode;
  likedArticles: WikiArticle[];
  language: string;
}) {
  localStorage.setItem('likedArticles', JSON.stringify(likedArticles));
  localStorage.setItem('lang', language);

  return <LikedArticlesProvider>{children}</LikedArticlesProvider>;
}

const preview: Preview = {
  decorators: [
    (Story, context) => (
      <StorybookProviders
        likedArticles={
          (context.parameters.likedArticles as WikiArticle[] | undefined) ?? []
        }
        language={(context.parameters.language as string | undefined) ?? 'en'}
      >
        <Story />
      </StorybookProviders>
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

export default preview;
