import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { WikiCard } from './WikiCard';
import type { WikiArticle } from './WikiCard';

const mockArticle: WikiArticle = {
  title: 'Aurora Borealis',
  displaytitle: 'Aurora Borealis',
  extract:
    'An aurora, also commonly known as the northern lights or southern lights, is a natural light display in the sky, predominantly seen in high-latitude regions. Auroras display dynamic patterns of brilliant lights that appear as curtains, rays, spirals, or dynamic flickers.',
  pageid: 18891,
  url: 'https://en.wikipedia.org/wiki/Aurora_(astronomy)',
  thumbnail: {
    source: 'https://picsum.photos/seed/aurora/800/600',
    width: 800,
    height: 600,
  },
};

const mockArticleNoImage: WikiArticle = {
  title: 'Philosophy',
  displaytitle: 'Philosophy',
  extract:
    'Philosophy is the study of general and fundamental questions about existence, knowledge, values, reason, mind, and language. Philosophical methods include questioning, critical discussion, rational argument, and systematic presentation.',
  pageid: 22927,
  url: 'https://en.wikipedia.org/wiki/Philosophy',
  thumbnail: undefined as unknown as WikiArticle['thumbnail'],
};

const meta = {
  component: WikiCard,
  tags: ['ai-generated'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof WikiCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    article: mockArticle,
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('heading', { name: /aurora borealis/i })
    ).toBeVisible();
    await expect(canvas.getByText(/read more/i)).toBeVisible();
    await expect(canvas.getByLabelText(/like article/i)).toBeVisible();
    await expect(canvas.getByLabelText(/share article/i)).toBeVisible();
  },
};

export const WithoutThumbnail: Story = {
  args: {
    article: mockArticleNoImage,
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('heading', { name: /philosophy/i })
    ).toBeVisible();
    await expect(canvas.getByText(/study of general/i)).toBeVisible();
  },
};

export const CssCheck: Story = {
  args: {
    article: mockArticle,
  },
  play: async ({ canvas }) => {
    const container = canvas.getByText(/aurora borealis/i).closest('div[class*="snap-start"]');
    await expect(container).not.toBeNull();
    await expect(getComputedStyle(container!).position).toBe('relative');
  },
};
