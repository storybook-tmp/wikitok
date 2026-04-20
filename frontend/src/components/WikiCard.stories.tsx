import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';
import { WikiCard } from './WikiCard';
import type { WikiArticle } from './WikiCard';

const adaLovelace: WikiArticle = {
  title: 'Ada Lovelace',
  displaytitle: 'Ada Lovelace',
  extract:
    "Ada Lovelace was an English mathematician and writer, chiefly known for her work on Charles Babbage's analytical engine.",
  pageid: 201,
  url: 'https://en.wikipedia.org/wiki/Ada_Lovelace',
  thumbnail: {
    source: '/wiki-logo.svg',
    width: 800,
    height: 800,
  },
};

const graceHopper: WikiArticle = {
  title: 'Grace Hopper',
  displaytitle: 'Grace Hopper',
  extract:
    'Grace Hopper was an American computer scientist and United States Navy rear admiral who helped develop early programming languages.',
  pageid: 202,
  url: 'https://en.wikipedia.org/wiki/Grace_Hopper',
  thumbnail: {
    source: '/web-app-manifest-192x192.png',
    width: 800,
    height: 800,
  },
};

const apollo11: WikiArticle = {
  title: 'Apollo 11',
  displaytitle: 'Apollo 11',
  extract:
    'Apollo 11 was the American spaceflight that first landed humans on the Moon. The mission made Neil Armstrong and Buzz Aldrin the first people to walk on the lunar surface.',
  pageid: 203,
  url: 'https://en.wikipedia.org/wiki/Apollo_11',
  thumbnail: {
    source: '/web-app-manifest-512x512.png',
    width: 800,
    height: 800,
  },
};

const meta = {
  component: WikiCard,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof WikiCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    article: adaLovelace,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /ada lovelace/i })).toBeVisible();
    await expect(canvas.getByRole('link', { name: /read more/i })).toHaveAttribute(
      'href',
      adaLovelace.url
    );

    const image = canvas.getByRole('img', { name: /ada lovelace/i });
    await waitFor(() => expect(image).toBeVisible());

    const likeButton = canvas.getByRole('button', { name: /like article/i });
    const storyWindow = likeButton.ownerDocument.defaultView;

    await waitFor(() =>
      expect(storyWindow?.getComputedStyle(likeButton).backgroundColor).toBe(
        'oklab(0.999994 0.0000455678 0.0000200868 / 0.1)'
      )
    );
  },
};

export const LikedAfterClick: Story = {
  args: {
    article: graceHopper,
  },
  play: async ({ canvas, userEvent }) => {
    const likeButton = canvas.getByRole('button', { name: /like article/i });

    await userEvent.click(likeButton);

    await waitFor(() => expect(likeButton).toHaveClass('bg-red-500'));
    await waitFor(() =>
      expect(localStorage.getItem('likedArticles')).toContain('Grace Hopper')
    );
  },
};

export const ReadMoreLink: Story = {
  args: {
    article: apollo11,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/first landed humans on the moon/i)).toBeVisible();
    await expect(canvas.getByRole('link', { name: /apollo 11/i })).toHaveAttribute(
      'href',
      apollo11.url
    );
  },
};
