import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';
import { WikiCard } from './WikiCard';
import { createMockWikiArticles } from '../storybook/mockWikiArticles';

const [auroraArticle, volcanoArticle] = createMockWikiArticles();

const meta = {
  component: WikiCard,
  render: (args) => <WikiCard {...args} />,
} satisfies Meta<typeof WikiCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    article: auroraArticle,
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('heading', { name: auroraArticle.displaytitle }),
    ).toBeVisible();
    await expect(
      canvas.getByRole('button', { name: /like article/i }),
    ).toBeVisible();
    await expect(canvas.getByRole('link', { name: /read more/i })).toHaveAttribute(
      'href',
      auroraArticle.url,
    );
  },
};

export const LikedAfterClick: Story = {
  args: {
    article: volcanoArticle,
  },
  play: async ({ canvas, userEvent }) => {
    const likeButton = canvas.getByRole('button', { name: /like article/i });

    await userEvent.click(likeButton);

    await waitFor(() => {
      expect(likeButton.className).toContain('bg-red-500');
      expect(localStorage.getItem('likedArticles')).toContain(
        String(volcanoArticle.pageid),
      );
    });
  },
};

export const DoubleClickLikeShowsHeart: Story = {
  args: {
    article: auroraArticle,
  },
  play: async ({ canvas, canvasElement, userEvent }) => {
    await userEvent.dblClick(canvas.getByText(auroraArticle.extract));

    await waitFor(() => {
      const animatedHeart = canvasElement.ownerDocument.querySelector(
        '.heart-animation',
      );

      expect(animatedHeart).toBeTruthy();
    });
  },
};
