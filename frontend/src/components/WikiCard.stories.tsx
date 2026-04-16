import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { WikiCard } from './WikiCard';
import type { WikiArticle } from './WikiCard';

const mockArticle: WikiArticle = {
  title: 'Mount Everest',
  displaytitle: 'Mount Everest',
  extract:
    "Mount Everest is Earth's highest mountain above sea level, located in the Mahalangur Himal sub-range of the Himalayas. The China–Nepal border runs across its summit point. Its elevation of 8,848.86 m was most recently established in 2020 by the Chinese and Nepali authorities.",
  pageid: 12345,
  url: 'https://en.wikipedia.org/wiki/Mount_Everest',
  thumbnail: {
    source:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Everest_North_Face_toward_Base_Camp_Tibet_Luca_Galuzzi_2006.jpg/800px-Everest_North_Face_toward_Base_Camp_Tibet_Luca_Galuzzi_2006.jpg',
    width: 800,
    height: 600,
  },
};

const mockArticleNoThumbnail: WikiArticle = {
  title: 'Amazon River',
  displaytitle: 'Amazon River',
  extract:
    "The Amazon River is the largest river in the world by discharge volume of water. It is the largest drainage basin in the world, and accounts for approximately one-fifth of the world's total river flow.",
  pageid: 11111,
  url: 'https://en.wikipedia.org/wiki/Amazon_River',
  thumbnail: null as unknown as WikiArticle['thumbnail'],
};

const meta = {
  component: WikiCard,
} satisfies Meta<typeof WikiCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithThumbnail: Story = {
  args: {
    article: mockArticle,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /mount everest/i })).toBeVisible();
    await expect(canvas.getByRole('link', { name: /read more/i })).toBeVisible();
    await expect(canvas.getByRole('button', { name: /like article/i })).toBeVisible();
    await expect(canvas.getByRole('button', { name: /share article/i })).toBeVisible();
  },
};

export const WithoutThumbnail: Story = {
  args: {
    article: mockArticleNoThumbnail,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /amazon river/i })).toBeVisible();
    await expect(canvas.getByRole('link', { name: /read more/i })).toBeVisible();
  },
};

export const Liked: Story = {
  args: {
    article: mockArticle,
  },
  play: async ({ canvas, userEvent }) => {
    const likeButton = canvas.getByRole('button', { name: /like article/i });
    await expect(likeButton).toBeVisible();
    await userEvent.click(likeButton);
    await expect(likeButton).toHaveClass('bg-red-500');
  },
};
