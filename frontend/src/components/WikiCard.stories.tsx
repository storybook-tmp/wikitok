import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { WikiCard } from './WikiCard';
import type { WikiArticle } from './WikiCard';

const mockArticle: WikiArticle = {
  title: 'Aurora Borealis',
  displaytitle: 'Aurora Borealis',
  extract:
    'An aurora, also commonly known as the polar lights, is a natural light display in Earth\'s sky, predominantly seen in high-latitude regions. Auroras display dynamic patterns of brilliant lights that appear as curtains, rays, spirals, or dynamic flickers covering the entire sky.',
  pageid: 12345,
  url: 'https://en.wikipedia.org/wiki/Aurora_Borealis',
  thumbnail: {
    source:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Polarlicht_2.jpg/800px-Polarlicht_2.jpg',
    width: 800,
    height: 600,
  },
};

const meta = {
  component: WikiCard,
  tags: ['ai-generated'],
} satisfies Meta<typeof WikiCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    article: mockArticle,
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('heading', { name: 'Aurora Borealis' }),
    ).toBeVisible();
    await expect(canvas.getByText(/natural light display/)).toBeVisible();
    await expect(canvas.getByText('Read more →')).toBeVisible();
  },
};

export const LikeArticle: Story = {
  args: {
    article: mockArticle,
  },
  play: async ({ canvas, userEvent }) => {
    const likeButton = canvas.getByRole('button', { name: /like article/i });
    await expect(likeButton).toBeVisible();
    await userEvent.click(likeButton);
    // After liking, the button should still be visible (now in liked state)
    await expect(likeButton).toBeVisible();
  },
};

export const ShareButton: Story = {
  args: {
    article: mockArticle,
  },
  play: async ({ canvas }) => {
    const shareButton = canvas.getByRole('button', { name: /share article/i });
    await expect(shareButton).toBeVisible();
  },
};

export const DifferentArticle: Story = {
  args: {
    article: {
      title: 'Nikola Tesla',
      displaytitle: 'Nikola Tesla',
      extract:
        'Nikola Tesla was a Serbian-American inventor, electrical engineer, mechanical engineer, and futurist best known for his contributions to the design of the modern alternating current electricity supply system.',
      pageid: 67890,
      url: 'https://en.wikipedia.org/wiki/Nikola_Tesla',
      thumbnail: {
        source:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Tesla_circa_1890.jpeg/800px-Tesla_circa_1890.jpeg',
        width: 800,
        height: 1000,
      },
    },
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('heading', { name: 'Nikola Tesla' }),
    ).toBeVisible();
    await expect(canvas.getByText(/Serbian-American inventor/)).toBeVisible();
  },
};
