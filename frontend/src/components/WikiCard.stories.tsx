import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { featuredWikiArticle, interactiveWikiArticle, likedWikiArticle } from '../../.storybook/mock-wiki-data';
import { WikiCard } from './WikiCard';

const meta = {
  component: WikiCard,
} satisfies Meta<typeof WikiCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-full bg-black text-white" style={{ minHeight: '100vh' }}>
      <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory hide-scroll">
        <WikiCard article={featuredWikiArticle} />
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(
      await canvas.findByRole('heading', { name: featuredWikiArticle.displaytitle }),
    ).toBeVisible();
    await expect(canvas.getByRole('button', { name: /like article/i })).toBeVisible();
    await expect(canvas.getByRole('button', { name: /share article/i })).toBeVisible();
  },
};

export const AlreadyLiked: Story = {
  render: () => (
    <div className="w-full bg-black text-white" style={{ minHeight: '100vh' }}>
      <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory hide-scroll">
        <WikiCard article={likedWikiArticle} />
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const likeButton = await canvas.findByRole('button', { name: /like article/i });

    await expect(
      canvas.getByRole('heading', { name: likedWikiArticle.displaytitle }),
    ).toBeVisible();
    await expect(likeButton).toHaveClass('bg-red-500');
  },
};

export const DoubleClickLikesArticle: Story = {
  render: () => (
    <div className="w-full bg-black text-white" style={{ minHeight: '100vh' }}>
      <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory hide-scroll">
        <WikiCard article={interactiveWikiArticle} />
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const likeButton = await canvas.findByRole('button', { name: /like article/i });

    await expect(likeButton).not.toHaveClass('bg-red-500');
    await userEvent.dblClick(
      canvas.getByRole('heading', { name: interactiveWikiArticle.displaytitle }),
    );
    await waitFor(() => {
      expect(likeButton).toHaveClass('bg-red-500');
    });
  },
};
