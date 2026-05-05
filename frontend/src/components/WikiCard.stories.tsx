import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { WikiCard } from './WikiCard';

const meta = {
  component: WikiCard,
  tags: ['ai-generated'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof WikiCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockArticle = {
  title: 'Aurora Borealis',
  displaytitle: 'Aurora Borealis',
  extract:
    'An aurora is a natural light display in the sky, predominantly seen in high-latitude regions. Auroras display dynamic patterns of brilliant lights that appear as curtains, rays, spirals, or dynamic flickers covering the entire sky.',
  pageid: 12345,
  url: 'https://en.wikipedia.org/wiki/Aurora_Borealis',
  thumbnail: {
    source: 'https://via.placeholder.com/800x600',
    width: 800,
    height: 600,
  },
};

export const Default: Story = {
  args: { article: mockArticle },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('button', { name: /like article/i })
    ).toBeVisible();
    await expect(
      canvas.getByRole('button', { name: /share article/i })
    ).toBeVisible();
  },
};

export const LongExtract: Story = {
  args: {
    article: {
      ...mockArticle,
      extract:
        'This is a very long extract that contains a lot of text. '.repeat(20),
    },
  },
};

export const LikeInteraction: Story = {
  args: { article: mockArticle },
  play: async ({ canvas, userEvent }) => {
    const likeButton = canvas.getByRole('button', { name: /like article/i });
    await userEvent.click(likeButton);
    await expect(likeButton.querySelector('.fill-white')).not.toBeNull();
  },
};

export const CssCheck: Story = {
  args: { article: mockArticle },
  play: async ({ canvasElement }) => {
    // src/index.css sets "html, body { overscroll-behavior-y: contain }" — proves global CSS loaded
    const html = canvasElement.ownerDocument.documentElement;
    await expect(getComputedStyle(html).overscrollBehaviorY).toBe('contain');
  },
};
