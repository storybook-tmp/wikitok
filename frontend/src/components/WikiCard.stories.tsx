import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';
import { WikiCard } from './WikiCard';

const mockArticle = {
  pageid: 12345,
  title: 'Albert Einstein',
  displaytitle: 'Albert Einstein',
  extract:
    'Albert Einstein was a German-born theoretical physicist who is widely held to be one of the greatest and most influential scientists of all time. Best known for developing the theory of relativity, he also made important contributions to quantum mechanics.',
  url: 'https://en.wikipedia.org/wiki/Albert_Einstein',
  thumbnail: {
    source: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Albert_Einstein_Head.jpg/800px-Albert_Einstein_Head.jpg',
    width: 800,
    height: 1000,
  },
};

const mockArticleNoThumbnail = {
  pageid: 99999,
  title: 'Some Article',
  displaytitle: 'Some Article Without an Image',
  extract:
    'This is an article that does not have a thumbnail image. It should still render correctly with a dark background fallback.',
  url: 'https://en.wikipedia.org/wiki/Some_Article',
  thumbnail: null as unknown as { source: string; width: number; height: number },
};

const meta = {
  component: WikiCard,
  args: {
    article: mockArticle,
  },
} satisfies Meta<typeof WikiCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <WikiCard article={mockArticle} />,
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { level: 2, name: /Albert Einstein/i })).toBeVisible();
    await expect(canvas.getByRole('button', { name: /like article/i })).toBeVisible();
    await expect(canvas.getByRole('button', { name: /share article/i })).toBeVisible();
    await expect(canvas.getByRole('link', { name: /read more/i })).toBeVisible();
  },
};

export const WithExtract: Story = {
  render: () => <WikiCard article={mockArticle} />,
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { level: 2, name: /Albert Einstein/i })).toBeVisible();
    await expect(canvas.getByText(/German-born theoretical physicist/)).toBeVisible();
  },
};

export const NoThumbnail: Story = {
  render: () => <WikiCard article={mockArticleNoThumbnail} />,
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { level: 2, name: /Some Article Without an Image/i })).toBeVisible();
    await expect(canvas.getByRole('button', { name: /like article/i })).toBeVisible();
  },
};

export const Liked: Story = {
  render: () => <WikiCard article={mockArticle} />,
  play: async ({ canvas, userEvent }) => {
    const likeButton = canvas.getByRole('button', { name: /like article/i });
    await userEvent.click(likeButton);
    await waitFor(() => {
      expect(likeButton.className).toContain('bg-red-500');
    });
  },
};
