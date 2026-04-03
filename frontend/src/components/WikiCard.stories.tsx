import type { Meta, StoryObj } from '@storybook/react-vite';
import { mockArticles, mockLikedArticle } from '../../.storybook/mock-data';
import { WikiCard } from './WikiCard';

const meta = {
  component: WikiCard,
} satisfies Meta<typeof WikiCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    article: mockArticles[0],
  },
  render: ({ article }) => (
    <div className="h-screen w-full overflow-y-scroll bg-black text-white hide-scroll snap-y snap-mandatory">
      <WikiCard article={article} />
    </div>
  ),
};

export const Liked: Story = {
  args: {
    article: mockLikedArticle,
  },
  render: ({ article }) => (
    <div className="h-screen w-full overflow-y-scroll bg-black text-white hide-scroll snap-y snap-mandatory">
      <WikiCard article={article} />
    </div>
  ),
};
