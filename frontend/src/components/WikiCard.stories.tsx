import type { Meta, StoryObj } from '@storybook/react-vite';
import { WikiCard } from './WikiCard';
import { mockArticles } from '../../.storybook/mockData';
import { waitForStoryReady } from '../../.storybook/waitForStoryReady';

const meta = {
  component: WikiCard,
} satisfies Meta<typeof WikiCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LikedInFeed: Story = {
  args: {
    article: mockArticles[0],
  },
  play: async ({ canvasElement }) => {
    await waitForStoryReady(canvasElement);
  },
  render: ({ article }) => (
    <div className="h-screen w-full bg-black text-white overflow-y-scroll snap-y snap-mandatory hide-scroll">
      <WikiCard article={article} />
    </div>
  ),
};

export const UnlikedInFeed: Story = {
  args: {
    article: mockArticles[1],
  },
  play: async ({ canvasElement }) => {
    await waitForStoryReady(canvasElement);
  },
  render: ({ article }) => (
    <div className="h-screen w-full bg-black text-white overflow-y-scroll snap-y snap-mandatory hide-scroll">
      <WikiCard article={article} />
    </div>
  ),
};
