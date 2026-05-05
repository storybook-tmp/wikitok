import type { Preview } from '@storybook/react-vite';
import '../src/index.css';
import '../src/styles/Article.css';
import '../src/assets/heartAnimation.css';
import { initialize, mswLoader } from 'msw-storybook-addon';
import { LikedArticlesProvider } from '../src/contexts/LikedArticlesContext';
import { mswHandlers } from './msw-handlers';

initialize({ onUnhandledRequest: 'bypass' });

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
    msw: { handlers: mswHandlers },
  },
};

export default preview;
