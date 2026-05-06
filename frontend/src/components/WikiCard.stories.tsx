import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { WikiCard } from './WikiCard';
import type { WikiArticle } from './WikiCard';

const sampleArticle: WikiArticle = {
  title: 'Aurora Borealis',
  displaytitle: 'Aurora Borealis',
  extract:
    'An aurora borealis, also known as the northern lights, is a natural light display predominantly seen in high-latitude regions around the Arctic. Auroras display dynamic patterns of brilliant lights that appear as curtains, rays, spirals, or dynamic flickers covering the entire sky.',
  pageid: 12345,
  url: 'https://en.wikipedia.org/wiki/Aurora_Borealis',
  thumbnail: {
    source:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Polarlicht_2.jpg/800px-Polarlicht_2.jpg',
    width: 800,
    height: 531,
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
    article: sampleArticle,
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('heading', { name: /aurora borealis/i })
    ).toBeVisible();
    await expect(canvas.getByText(/natural light display/i)).toBeVisible();
    await expect(canvas.getByText(/read more/i)).toBeVisible();
    await expect(
      canvas.getByRole('button', { name: /like article/i })
    ).toBeVisible();
    await expect(
      canvas.getByRole('button', { name: /share article/i })
    ).toBeVisible();
  },
};

export const LikedState: Story = {
  args: {
    article: sampleArticle,
  },
  play: async ({ canvas, userEvent }) => {
    const likeButton = canvas.getByRole('button', { name: /like article/i });
    await userEvent.click(likeButton);
    await expect(likeButton).toBeVisible();
    await expect(
      canvas.getByRole('heading', { name: /aurora borealis/i })
    ).toBeVisible();
  },
};

export const NoThumbnail: Story = {
  args: {
    article: {
      ...sampleArticle,
      thumbnail: undefined as unknown as WikiArticle['thumbnail'],
    },
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('heading', { name: /aurora borealis/i })
    ).toBeVisible();
    await expect(canvas.getByText(/natural light display/i)).toBeVisible();
  },
};

export const CssCheck: Story = {
  args: {
    article: sampleArticle,
  },
  play: async ({ canvasElement }) => {
    const flexContainer = canvasElement.querySelector('.flex')!;
    // flex class from Tailwind — fails if global CSS did not load
    await expect(getComputedStyle(flexContainer).display).toBe('flex');
  },
};
