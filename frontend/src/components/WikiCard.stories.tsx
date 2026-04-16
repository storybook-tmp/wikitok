import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentProps } from 'react';
import {
  featuredArticle,
  likedArticle,
  longReadArticle,
} from '../../.storybook/mock-data';
import { WikiCard } from './WikiCard';

const meta = {
  component: WikiCard,
  render: ({ article }) => renderFeedCard(article),
} satisfies Meta<typeof WikiCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    article: featuredArticle,
  },
};

export const LikedArticle: Story = {
  args: {
    article: likedArticle,
  },
};

export const LongRead: Story = {
  args: {
    article: longReadArticle,
  },
};

function renderFeedCard(article: ComponentProps<typeof WikiCard>['article']) {
  return (
    <div
      className="bg-black text-white overflow-hidden"
      style={{ minHeight: '100vh', width: '100vw' }}
    >
      <WikiCard article={article} />
    </div>
  );
}
