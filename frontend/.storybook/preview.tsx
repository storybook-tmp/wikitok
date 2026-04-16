import type { Preview } from '@storybook/react-vite';
import '../src/index.css';
import { LikedArticlesProvider } from '../src/contexts/LikedArticlesContext';

const preview: Preview = {
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
  decorators: [
    (Story) => (
      <LikedArticlesProvider>
        <Story />
      </LikedArticlesProvider>
    ),
  ],
};

export default preview;
