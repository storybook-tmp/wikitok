import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { WikiCard } from './WikiCard';
import { defaultLikedArticles, wikiArticleBatches } from '../../.storybook/wiki-fixtures';

const meta = {
  component: WikiCard,
} satisfies Meta<typeof WikiCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => renderWikiCardInFeed(wikiArticleBatches[0][1]),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(() =>
      expect(canvas.getByRole('heading', { name: /basalt spire/i })).toBeVisible(),
    );
    await expect(canvas.getByRole('img', { name: /basalt spire/i })).toBeVisible();
    await expect(canvas.getByRole('button', { name: /share article/i })).toBeVisible();
  },
};

export const LikedState: Story = {
  render: () => renderWikiCardInFeed(defaultLikedArticles[0]),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const likeButton = canvas.getByRole('button', { name: /like article/i });

    await waitFor(() =>
      expect(canvas.getByRole('heading', { name: /aurora lake/i })).toBeVisible(),
    );
    await expect(likeButton).toHaveClass('bg-red-500');
  },
};

export const DoubleClickLikesArticle: Story = {
  render: () => renderWikiCardInFeed(wikiArticleBatches[1][0]),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();
    const likeButton = canvas.getByRole('button', { name: /like article/i });

    await waitFor(() =>
      expect(canvas.getByRole('heading', { name: /cedar library/i })).toBeVisible(),
    );
    await user.dblClick(canvas.getByText(/modern public archive/i));
    await expect(likeButton).toHaveClass('bg-red-500');
    await expect(canvasElement.ownerDocument.querySelector('.heart-animation')).toBeTruthy();
  },
};

function renderWikiCardInFeed(article: (typeof wikiArticleBatches)[number][number]) {
  return (
    <div className="h-screen w-full bg-black text-white overflow-y-scroll snap-y snap-mandatory hide-scroll">
      <WikiCard article={article} />
    </div>
  );
}
