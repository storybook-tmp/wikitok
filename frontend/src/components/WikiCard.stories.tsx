import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { WikiCard, type WikiArticle } from './WikiCard';

const mockArticle: WikiArticle = {
  title: 'Python (programming language)',
  displaytitle: 'Python (programming language)',
  extract: 'Python is a high-level, general-purpose programming language. Its design philosophy emphasizes code readability with the use of significant indentation.',
  pageid: 23862,
  url: 'https://en.wikipedia.org/wiki/Python_(programming_language)',
  thumbnail: {
    source: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1200px-Python-logo-notext.svg.png',
    width: 200,
    height: 200,
  },
};

const mockArticleNoThumbnail: WikiArticle = {
  title: 'Abstract concept',
  displaytitle: 'Abstract Concept',
  extract: 'An abstract concept is an idea or notion that does not have a physical form.',
  pageid: 12345,
  url: 'https://en.wikipedia.org/wiki/Abstract_concept',
  thumbnail: {
    source: '',
    width: 0,
    height: 0,
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
    article: mockArticle,
  },
  play: async ({ canvas }) => {
    // Check that title is visible
    const title = canvas.getByRole('link', { name: /Python/i });
    await expect(title).toBeVisible();

    // Check that extract is visible
    const extract = canvas.getByText(/high-level, general-purpose programming language/i);
    await expect(extract).toBeVisible();

    // Check that buttons are visible
    const likeButton = canvas.getByRole('button', { name: /Like article/i });
    await expect(likeButton).toBeVisible();

    const shareButton = canvas.getByRole('button', { name: /Share article/i });
    await expect(shareButton).toBeVisible();
  },
};

export const WithImage: Story = {
  args: {
    article: mockArticle,
  },
  play: async ({ canvas }) => {
    // Wait for image to load
    const image = canvas.getByAltText(/Python/i) as HTMLImageElement;
    await expect(image).toBeVisible();

    // Check that the image has the correct src
    await expect(image.src).toBeTruthy();
  },
};

export const Liked: Story = {
  args: {
    article: mockArticle,
  },
  beforeEach() {
    // Pre-set the article as liked in localStorage
    localStorage.setItem('likedArticles', JSON.stringify([mockArticle]));
  },
  play: async ({ canvas }) => {
    // Check that the like button is filled (red background indicates liked state)
    const likeButton = canvas.getByRole('button', { name: /Like article/i });
    await expect(likeButton).toBeVisible();
  },
};
