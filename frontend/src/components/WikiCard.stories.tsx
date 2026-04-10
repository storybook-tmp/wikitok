import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { mockLikedArticles, mockWikiArticles } from '../../.storybook/wiki-fixtures';
import { WikiCard } from './WikiCard';

const meta = {
  component: WikiCard,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof WikiCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <WikiCard article={mockWikiArticles[0]} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(
      canvas.getByRole('heading', { name: /aurora forest/i }),
    ).toBeVisible();
    await expect(
      canvas.getByRole('img', { name: /aurora forest/i }),
    ).toBeVisible();
    await expect(
      canvas.getByRole('button', { name: /like article/i }),
    ).toBeVisible();
    await expect(
      canvas.getByRole('button', { name: /share article/i }),
    ).toBeVisible();
  },
};

export const PreLiked: Story = {
  render: () => <WikiCard article={mockLikedArticles[0]} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const likeButton = canvas.getByRole('button', { name: /like article/i });

    await expect(
      canvas.getByRole('heading', { name: /orbital garden/i }),
    ).toBeVisible();
    await expect(likeButton).toHaveClass('bg-red-500');
  },
};

export const DoubleClickAddsLike: Story = {
  render: () => <WikiCard article={mockWikiArticles[1]} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const articleImage = canvas.getByRole('img', { name: /city after rain/i });
    const likeButton = canvas.getByRole('button', { name: /like article/i });

    await userEvent.dblClick(articleImage);

    await waitFor(() => {
      expect(likeButton).toHaveClass('bg-red-500');
      expect(
        JSON.parse(localStorage.getItem('likedArticles') ?? '[]').some(
          (article: { pageid: number }) => article.pageid === mockWikiArticles[1].pageid,
        ),
      ).toBe(true);
      expect(canvasElement.querySelector('.heart-animation')).not.toBeNull();
    });
  },
};
