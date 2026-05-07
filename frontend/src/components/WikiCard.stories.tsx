import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';
import { WikiCard, type WikiArticle } from './WikiCard';

const thumbnail =
  'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 16 16%22%3E%3Crect width=%2216%22 height=%2216%22 fill=%22black%22/%3E%3C/svg%3E';

const article: WikiArticle = {
  title: 'Storybook',
  displaytitle: 'Storybook',
  extract:
    'Storybook is a frontend workshop for building UI components and pages in isolation.',
  pageid: 101,
  url: 'https://en.wikipedia.org/wiki/Storybook',
  thumbnail: {
    source: thumbnail,
    width: 800,
    height: 800,
  },
};

const longArticle: WikiArticle = {
  title: 'Wikipedia',
  displaytitle: 'Wikipedia',
  extract:
    'Wikipedia is a free online encyclopedia written and maintained by volunteers through open collaboration. Its articles cover many topics and are continuously edited.',
  pageid: 102,
  url: 'https://en.wikipedia.org/wiki/Wikipedia',
  thumbnail: {
    source: thumbnail,
    width: 512,
    height: 512,
  },
};

const meta = {
  component: WikiCard,
  args: {
    article,
  },
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['ai-generated'],
} satisfies Meta<typeof WikiCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: 'Storybook' })).toBeVisible();
    await expect(canvas.getByRole('link', { name: /read more/i })).toHaveAttribute(
      'href',
      'https://en.wikipedia.org/wiki/Storybook'
    );
  },
};

export const LongExtract: Story = {
  args: {
    article: longArticle,
  },
};

export const LikeInteraction: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Like article' }));

    await waitFor(() => {
      expect(localStorage.getItem('likedArticles')).toContain('"pageid":101');
    });
  },
};
