import type { Meta, StoryObj } from '@storybook/react-vite';
import { WikiCard } from './WikiCard';
import { likedArticlesSeed, mockWikiArticles } from '../../.storybook/mockWikiData';

const meta = {
  component: WikiCard,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof WikiCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <WikiCard article={mockWikiArticles[2]} />,
};

export const Liked: Story = {
  render: () => <WikiCard article={likedArticlesSeed[0]} />,
};
