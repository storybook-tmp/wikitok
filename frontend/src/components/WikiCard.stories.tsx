import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { WikiCard } from './WikiCard';
import type { WikiArticle } from './WikiCard';

const mockArticle: WikiArticle = {
  title: 'Solar System',
  displaytitle: 'Solar System',
  extract:
    'The Solar System is the gravitationally bound system of the Sun and the objects that orbit it. The largest of such objects are the eight planets. The Solar System formed 4.6 billion years ago from the gravitational collapse of a giant interstellar molecular cloud.',
  pageid: 12345,
  url: 'https://en.wikipedia.org/wiki/Solar_System',
  thumbnail: {
    source:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Solar_sys8.jpg/800px-Solar_sys8.jpg',
    width: 800,
    height: 600,
  },
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
      canvas.getByRole('heading', { name: /solar system/i }),
    ).toBeVisible();
    await expect(canvas.getByText(/gravitationally bound/i)).toBeVisible();
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
    // After clicking like, the button should still be visible
    await expect(likeButton).toBeVisible();
  },
};

export const ShareButton: Story = {
  args: {
    article: {
      ...mockArticle,
      pageid: 99999,
      title: 'Great Wall of China',
      displaytitle: 'Great Wall of China',
      extract:
        'The Great Wall of China is a series of fortifications that were built across the historical northern borders of ancient Chinese states.',
      url: 'https://en.wikipedia.org/wiki/Great_Wall_of_China',
    },
  },
  play: async ({ canvas }) => {
    const shareButton = canvas.getByRole('button', {
      name: /share article/i,
    });
    await expect(shareButton).toBeVisible();
    await expect(
      canvas.getByRole('heading', { name: /great wall of china/i }),
    ).toBeVisible();
  },
};

export const CssCheck: Story = {
  args: {
    article: mockArticle,
  },
  play: async ({ canvasElement }) => {
    // index.css sets overscroll-behavior-y: contain on body — fails if global CSS did not load.
    const body = canvasElement.ownerDocument.body;
    await expect(getComputedStyle(body).overscrollBehaviorY).toBe('contain');
  },
};

export const LongExtract: Story = {
  args: {
    article: {
      ...mockArticle,
      pageid: 88888,
      title: 'History of Science',
      displaytitle: 'History of Science',
      extract:
        'The history of science covers the development of science from ancient times to the present. It encompasses all three major branches of science: natural, social, and formal. Science in the broadest sense existed before the modern era and in many historical civilizations. Modern science is distinct in its approach and successful in its results, so it now defines what science is in the strictest sense of the term. Science in its original sense was a word for a type of knowledge, rather than a specialized word for the pursuit of such knowledge.',
    },
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('heading', { name: /history of science/i }),
    ).toBeVisible();
    await expect(canvas.getByText(/development of science/i)).toBeVisible();
  },
};
