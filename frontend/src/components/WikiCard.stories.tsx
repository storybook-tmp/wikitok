import type { Meta, StoryObj } from '@storybook/react-vite';
import { WikiCard } from './WikiCard';
import { LikedArticlesProvider } from '../contexts/LikedArticlesContext';
import { sampleWikiArticle, sampleWikiArticles } from '../storybook/fixtures';

const meta = {
  title: 'AI Generated/Complex/WikiCard',
  component: WikiCard,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof WikiCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultCard: Story = {
  args: {
    article: sampleWikiArticle,
  },
  render: ({ article }) => renderWikiCard(article, []),
};

export const LikedCard: Story = {
  args: {
    article: sampleWikiArticles[1],
  },
  render: ({ article }) => renderWikiCard(article, [article]),
};

function renderWikiCard(article: typeof sampleWikiArticle, likedArticles: typeof sampleWikiArticles) {
  localStorage.setItem('likedArticles', JSON.stringify(likedArticles));

  return (
    <LikedArticlesProvider>
      <WikiCard article={article} />
    </LikedArticlesProvider>
  );
}
