import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { WikiCard } from './WikiCard';
import type { WikiArticle } from './WikiCard';

const mockArticle: WikiArticle = {
  title: 'Theory of relativity',
  displaytitle: 'Theory of relativity',
  extract:
    'The theory of relativity usually encompasses two interrelated physics theories by Albert Einstein: special relativity and general relativity, proposed and published in 1905 and 1915, respectively.',
  pageid: 12345,
  url: 'https://en.wikipedia.org/wiki/Theory_of_relativity',
  thumbnail: {
    source: 'https://placehold.co/800x600/333/white?text=Relativity',
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

export const Default: Story = {
  args: {
    article: mockArticle,
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByText('Theory of relativity'),
    ).toBeVisible();
    await expect(
      canvas.getByText(/two interrelated physics theories/),
    ).toBeVisible();
    await expect(canvas.getByText('Read more →')).toBeVisible();
    await expect(
      canvas.getByRole('button', { name: /like/i }),
    ).toBeVisible();
    await expect(
      canvas.getByRole('button', { name: /share/i }),
    ).toBeVisible();
  },
};

export const LikeToggle: Story = {
  args: {
    article: mockArticle,
  },
  play: async ({ canvas, userEvent }) => {
    const likeButton = canvas.getByRole('button', { name: /like/i });
    await expect(likeButton).toBeVisible();
    await userEvent.click(likeButton);
    await expect(likeButton.className).toContain('bg-red-500');
    await userEvent.click(likeButton);
    await expect(likeButton.className).not.toContain('bg-red-500');
  },
};

export const WithoutThumbnail: Story = {
  args: {
    article: {
      ...mockArticle,
      pageid: 99999,
      thumbnail: undefined as unknown as WikiArticle['thumbnail'],
    },
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByText('Theory of relativity'),
    ).toBeVisible();
    const images = canvas.queryAllByRole('img');
    await expect(images).toHaveLength(0);
  },
};
