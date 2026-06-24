import type { Meta, StoryObj } from '@storybook/react-vite';
import { WikiCard } from './WikiCard';

const meta = {
  title: 'AI Generated/Medium/WikiCard',
  component: WikiCard,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof WikiCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    article: {
      title: 'Example Article',
      displaytitle: 'Example Article',
      extract:
        'This is a sample Wikipedia article about a fascinating topic. It contains interesting facts and details that readers might find useful when learning about the world.',
      pageid: 12345,
      url: 'https://en.wikipedia.org/wiki/Example',
      thumbnail: {
        source:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Wikipedia-logo-v2.svg/220px-Wikipedia-logo-v2.svg.png',
        width: 220,
        height: 220,
      },
    },
  },
};

export const LongExtract: Story = {
  args: {
    article: {
      title: 'Detailed Article',
      displaytitle: 'A Very Detailed Article',
      extract:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      pageid: 67890,
      url: 'https://en.wikipedia.org/wiki/Detailed',
      thumbnail: {
        source:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Camponotus_flavomarginatus_ant.jpg/220px-Camponotus_flavomarginatus_ant.jpg',
        width: 220,
        height: 165,
      },
    },
  },
};
