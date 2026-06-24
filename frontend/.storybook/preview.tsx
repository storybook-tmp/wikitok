import type { Preview } from '@storybook/react-vite';

import '../src/index.css';

const preview: Preview = {
  decorators: [
    (Story) => {
      localStorage.removeItem('likedArticles');
      localStorage.removeItem('lang');

      return <Story />;
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
