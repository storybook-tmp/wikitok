import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { WikiCard } from './WikiCard';

const mockArticle = {
  title: 'Aurora Borealis',
  displaytitle: 'Aurora Borealis',
  extract:
    'An aurora borealis, also known as the northern lights, is a natural light display in the sky, predominantly seen in high-latitude regions around the Arctic and Antarctic.',
  pageid: 101,
  url: 'https://en.wikipedia.org/wiki/Aurora_Borealis',
  thumbnail: {
    source: 'https://placehold.co/800x600/1a1a2e/ffffff?text=Aurora',
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
    await expect(canvas.getByText('Aurora Borealis')).toBeVisible();
    await expect(canvas.getByText(/natural light display/i)).toBeVisible();
    await expect(canvas.getByText('Read more →')).toBeVisible();
  },
};

export const WithLikeButton: Story = {
  args: {
    article: mockArticle,
  },
  play: async ({ canvas, userEvent }) => {
    const likeButton = canvas.getByRole('button', { name: /like article/i });
    await expect(likeButton).toBeVisible();
    await userEvent.click(likeButton);
    await expect(likeButton).toBeVisible();
  },
};

export const DifferentArticle: Story = {
  args: {
    article: {
      title: 'Cephalopod Intelligence',
      displaytitle: 'Cephalopod Intelligence',
      extract:
        'Cephalopod intelligence is a measure of the cognitive ability of the cephalopod class of molluscs. They are considered the most intelligent invertebrates.',
      pageid: 102,
      url: 'https://en.wikipedia.org/wiki/Cephalopod_intelligence',
      thumbnail: {
        source: 'https://placehold.co/800x600/2e1a2e/ffffff?text=Octopus',
        width: 800,
        height: 600,
      },
    },
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Cephalopod Intelligence')).toBeVisible();
    await expect(canvas.getByText(/cognitive ability/i)).toBeVisible();
  },
};

export const ShareButton: Story = {
  args: {
    article: mockArticle,
  },
  play: async ({ canvas }) => {
    const shareButton = canvas.getByRole('button', { name: /share article/i });
    await expect(shareButton).toBeVisible();
    const likeButton = canvas.getByRole('button', { name: /like article/i });
    await expect(likeButton).toBeVisible();
  },
};
