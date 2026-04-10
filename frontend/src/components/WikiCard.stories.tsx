import type { Meta, StoryObj } from '@storybook/react-vite';
import { longExtractArticle, seededLikedArticles, storyWikiArticles } from '../../.storybook/mock-data';
import { WikiCard } from './WikiCard';

const meta = {
  component: WikiCard,
} satisfies Meta<typeof WikiCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="relative bg-black overflow-hidden" style={{ width: 393, height: 852 }}>
      <WikiCard article={storyWikiArticles[0]} />
    </div>
  ),
};

export const Liked: Story = {
  render: () => (
    <div className="relative bg-black overflow-hidden" style={{ width: 393, height: 852 }}>
      <WikiCard article={seededLikedArticles[0]} />
    </div>
  ),
};

export const LongExtract: Story = {
  render: () => (
    <div className="relative bg-black overflow-hidden" style={{ width: 393, height: 852 }}>
      <WikiCard article={longExtractArticle} />
    </div>
  ),
};
