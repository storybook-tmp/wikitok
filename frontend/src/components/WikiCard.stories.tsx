import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';
import { WikiCard } from './WikiCard';
import type { WikiArticle } from './WikiCard';

const sampleArticle: WikiArticle = {
  title: 'Solar System',
  displaytitle: 'Solar System',
  extract:
    'The Solar System is the gravitationally bound system of the Sun and the objects that orbit it. It formed 4.6 billion years ago from the gravitational collapse of a giant interstellar molecular cloud.',
  pageid: 101,
  url: 'https://en.wikipedia.org/wiki/Solar_System',
  thumbnail: {
    source:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Planets2013.svg/800px-Planets2013.svg.png',
    width: 800,
    height: 600,
  },
};

const articleWithoutThumbnail: WikiArticle = {
  title: 'Ada Lovelace',
  displaytitle: 'Ada Lovelace',
  extract:
    'Augusta Ada King, Countess of Lovelace was an English mathematician and writer, chiefly known for her work on Charles Babbage\'s proposed mechanical general-purpose computer.',
  pageid: 103,
  url: 'https://en.wikipedia.org/wiki/Ada_Lovelace',
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
    article: sampleArticle,
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('heading', { name: /solar system/i })
    ).toBeVisible();
    await expect(canvas.getByText(/gravitationally bound/i)).toBeVisible();
    await expect(canvas.getByText(/read more/i)).toBeVisible();
  },
};

export const WithoutThumbnail: Story = {
  args: {
    article: articleWithoutThumbnail,
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('heading', { name: /ada lovelace/i })
    ).toBeVisible();
    await expect(canvas.getByText(/english mathematician/i)).toBeVisible();
  },
};

export const LikeInteraction: Story = {
  args: {
    article: sampleArticle,
  },
  play: async ({ canvas, userEvent }) => {
    const likeButton = canvas.getByRole('button', { name: /like article/i });
    await expect(likeButton).toBeVisible();

    // Click like
    await userEvent.click(likeButton);

    // The button should now have the red background (liked state)
    await waitFor(() => {
      const classes = likeButton.className;
      expect(classes).toContain('bg-red-500');
    });

    // Click again to unlike
    await userEvent.click(likeButton);
    await waitFor(() => {
      const classes = likeButton.className;
      expect(classes).not.toContain('bg-red-500');
    });
  },
};
