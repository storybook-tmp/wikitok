import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { WikiCard, type WikiArticle } from './WikiCard';

const mockArticleLoadingImage: WikiArticle = {
  title: 'JavaScript',
  displaytitle: 'JavaScript',
  extract: 'JavaScript is a versatile programming language used for web development.',
  pageid: 456,
  url: 'https://en.wikipedia.org/wiki/JavaScript',
  thumbnail: {
    source: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/220px-Unofficial_JavaScript_logo_2.svg.png',
    width: 200,
    height: 200,
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

export const ImageLoading: Story = {
  args: {
    article: mockArticleLoadingImage,
  },
  play: async ({ canvas }) => {
    // Wait a bit for the page to render
    await new Promise(resolve => setTimeout(resolve, 100));

    // Check that the title is visible even while image is loading
    const title = canvas.getByRole('link', { name: /JavaScript/i });
    await expect(title).toBeVisible();

    // Check that extract is visible
    const extract = canvas.getByText(/versatile programming language/i);
    await expect(extract).toBeVisible();
  },
};

export const WithoutThumbnail: Story = {
  args: {
    article: {
      title: 'No Image Article',
      displaytitle: 'Article Without Image',
      extract: 'This article has no thumbnail image.',
      pageid: 789,
      url: 'https://en.wikipedia.org/wiki/Example',
      thumbnail: {
        source: '',
        width: 0,
        height: 0,
      },
    },
  },
  play: async ({ canvas }) => {
    // Check that the content is still visible without an image
    const title = canvas.getByRole('link', { name: /Article Without Image/i });
    await expect(title).toBeVisible();

    const extract = canvas.getByText(/no thumbnail image/i);
    await expect(extract).toBeVisible();
  },
};
