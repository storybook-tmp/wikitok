import type { Meta, StoryObj } from '@storybook/react-vite';
import { WikiCard } from './WikiCard';

const meta = {
  title: 'AI Generated/Complex/WikiCard',
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
      title: 'Albert_Einstein',
      displaytitle: 'Albert Einstein',
      extract:
        'Albert Einstein was a German-born theoretical physicist who is widely held to be one of the greatest and most influential scientists of all time. He is best known for developing the theory of relativity.',
      pageid: 736,
      url: 'https://en.wikipedia.org/wiki/Albert_Einstein',
      thumbnail: {
        source:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Einstein_1921_by_F_Studer.jpg/400px-Einstein_1921_by_F_Studer.jpg',
        width: 400,
        height: 491,
      },
    },
  },
};

export const NoThumbnail: Story = {
  args: {
    article: {
      title: 'Philosophy',
      displaytitle: 'Philosophy',
      extract:
        'Philosophy is the study of general and fundamental questions about existence, knowledge, values, reason, mind, and language. Such questions are often posed as problems to be studied or resolved.',
      pageid: 25131,
      url: 'https://en.wikipedia.org/wiki/Philosophy',
      thumbnail: {
        source: '',
        width: 0,
        height: 0,
      },
    },
  },
};
