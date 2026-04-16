import type { Meta, StoryObj } from '@storybook/react';
import { WikiCard } from './WikiCard';
import type { WikiArticle } from './WikiCard';

const mockArticle: WikiArticle = {
  title: 'Albert Einstein',
  displaytitle: 'Albert Einstein',
  extract:
    'Albert Einstein was a German-born theoretical physicist who is widely held to be one of the greatest and most influential scientists of all time. He is best known for developing the theory of relativity.',
  pageid: 736,
  url: 'https://en.wikipedia.org/wiki/Albert_Einstein',
  thumbnail: {
    source:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Einstein_1921_by_F_Schmutzer_-_restoration.jpg/800px-Einstein_1921_by_F_Schmutzer_-_restoration.jpg',
    width: 800,
    height: 1068,
  },
};

const meta = {
  title: 'AI Generated/Complex/WikiCard',
  component: WikiCard,
  decorators: [
    (Story) => (
      <div style={{ height: '100vh', width: '100%' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof WikiCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    article: mockArticle,
  },
};

export const NoThumbnail: Story = {
  args: {
    article: {
      ...mockArticle,
      title: 'Text Only Article',
      displaytitle: 'Text Only Article',
      thumbnail: undefined as unknown as WikiArticle['thumbnail'],
    },
  },
};
