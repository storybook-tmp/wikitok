import type { Preview } from '@storybook/react-vite';
import { initialize, mswLoader } from 'msw-storybook-addon';
import '../src/index.css';
import '../src/styles/Article.css';
import { LikedArticlesProvider } from '../src/contexts/LikedArticlesContext';
import { mswHandlers } from './msw-handlers';

initialize({
  onUnhandledRequest: 'bypass',
});

const preview: Preview = {
  decorators: [
    (Story) => (
      <LikedArticlesProvider>
        <Story />
      </LikedArticlesProvider>
    ),
  ],
  loaders: [mswLoader],
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
    msw: {
      handlers: mswHandlers,
    },
  },
  async beforeEach() {
    localStorage.setItem('lang', 'en');
    localStorage.setItem(
      'likedArticles',
      JSON.stringify([
        {
          title: 'Seeded Storybook Favorite',
          displaytitle: 'Seeded Storybook Favorite',
          extract:
            'A deterministic liked article used by Storybook to mirror the app favorites state.',
          pageid: 404,
          url: 'https://en.wikipedia.org/wiki/Storybook',
          thumbnail: {
            source:
              'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20600%22%3E%3Crect%20width%3D%22800%22%20height%3D%22600%22%20fill%3D%22%23111827%22%2F%3E%3Ctext%20x%3D%22400%22%20y%3D%22308%22%20text-anchor%3D%22middle%22%20font-family%3D%22Arial%22%20font-size%3D%2248%22%20fill%3D%22white%22%3EStorybook%3C%2Ftext%3E%3C%2Fsvg%3E',
            width: 800,
            height: 600,
          },
        },
      ]),
    );
  },
};

export default preview;
