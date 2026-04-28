import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { WikiCard } from './WikiCard';
import type { WikiArticle } from './WikiCard';

const likedArticle: WikiArticle = {
  title: 'Pre-liked article',
  displaytitle: 'Pre-liked article',
  extract: 'This article was already liked by the user before the story loaded.',
  pageid: 55555,
  url: 'https://en.wikipedia.org/wiki/Pre-liked_article',
  thumbnail: {
    source: 'https://placehold.co/800x600/8b0000/white?text=Liked',
    width: 800,
    height: 600,
  },
};

const meta: Meta<typeof WikiCard> = {
  component: WikiCard,
  tags: ['ai-generated'],
  decorators: [
    (Story) => (
      <div style={{ height: '100vh', width: '100%', background: '#000' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof WikiCard>;

export const PreLiked: Story = {
  args: {
    article: likedArticle,
  },
  async beforeEach() {
    localStorage.setItem(
      'likedArticles',
      JSON.stringify([likedArticle]),
    );
  },
  play: async ({ canvas }) => {
    const likeButton = canvas.getByRole('button', { name: /like/i });
    await expect(likeButton).toBeVisible();
    // The button should show red (liked state) because we pre-seeded localStorage
    await expect(likeButton.className).toContain('bg-red-500');
  },
};

export const UnlikePreLiked: Story = {
  args: {
    article: likedArticle,
  },
  async beforeEach() {
    localStorage.setItem(
      'likedArticles',
      JSON.stringify([likedArticle]),
    );
  },
  play: async ({ canvas, userEvent }) => {
    const likeButton = canvas.getByRole('button', { name: /like/i });
    await expect(likeButton.className).toContain('bg-red-500');
    await userEvent.click(likeButton);
    await expect(likeButton.className).not.toContain('bg-red-500');
  },
};

export const ShareButton: Story = {
  args: {
    article: likedArticle,
  },
  play: async ({ canvas }) => {
    const shareButton = canvas.getByRole('button', { name: /share/i });
    await expect(shareButton).toBeVisible();
    await expect(canvas.getByText('Read more →')).toBeVisible();
  },
};
