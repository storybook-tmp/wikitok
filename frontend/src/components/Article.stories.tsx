import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import Article from './Article';

const meta = {
  component: Article,
  args: {
    title: 'Article Title',
    content: 'Article content.',
  },
} satisfies Meta<typeof Article>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Article
      title="Albert Einstein"
      content="Albert Einstein was a German-born theoretical physicist who is widely held to be one of the greatest and most influential scientists of all time."
    />
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('article')).toBeVisible();
    await expect(canvas.getByRole('heading', { name: /Albert Einstein/i })).toBeVisible();
    await expect(canvas.getByText(/German-born theoretical physicist/)).toBeVisible();
  },
};

export const WithImage: Story = {
  render: () => (
    <Article
      title="Marie Curie"
      content="Marie Curie was a Polish and naturalised-French physicist and chemist who conducted pioneering research on radioactivity."
      image="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Marie_Curie_c1920.jpg/800px-Marie_Curie_c1920.jpg"
    />
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('article')).toBeVisible();
    await expect(canvas.getByRole('img', { name: /Illustration for article: Marie Curie/i })).toBeVisible();
    await expect(canvas.getByText(/Polish and naturalised-French/)).toBeVisible();
  },
};

export const LongContent: Story = {
  render: () => (
    <Article
      title="The History of the Universe"
      content="The universe is all of space and time and their contents, including planets, stars, galaxies, and all other forms of matter and energy. The Big Bang theory is the prevailing cosmological description of the development of the universe. According to this theory, space and time emerged together approximately 13.787 billion years ago, and the universe has been expanding ever since. While the spatial size of the entire universe is unknown, the observable universe is about 93 billion light-years in diameter at the present day. Some of the first theoretical considerations of a relativistic cosmology were made by Albert Einstein."
    />
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('article')).toBeVisible();
    await expect(canvas.getByRole('heading', { name: /The History of the Universe/i })).toBeVisible();
    await expect(canvas.getByText(/Big Bang theory/)).toBeVisible();
  },
};
