import type { Preview } from '@storybook/react-vite';
import '../src/index.css';
import { LikedArticlesProvider } from '../src/contexts/LikedArticlesContext';
import { ReactNode } from 'react';

const preview: Preview = {
  decorators: [
    (Story: () => ReactNode) => (
      <LikedArticlesProvider>
        <Story />
      </LikedArticlesProvider>
    ),
  ],
  beforeEach() {
    // Set up default language in localStorage
    localStorage.setItem('lang', 'en');
    // Initialize empty liked articles
    localStorage.setItem('likedArticles', '[]');
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
