import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import Article from './Article';

const meta = {
  component: Article,
  tags: ['ai-generated'],
} satisfies Meta<typeof Article>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'The History of Jazz',
    content:
      'Jazz is a music genre that originated in the African-American communities of New Orleans in the late 19th and early 20th centuries.',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('The History of Jazz')).toBeVisible();
    await expect(
      canvas.getByText(/Jazz is a music genre/),
    ).toBeVisible();
  },
};

export const WithImage: Story = {
  args: {
    title: 'Aurora Borealis',
    content:
      'An aurora is a natural light display in Earth\'s sky, predominantly seen in high-latitude regions.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Polarlicht_2.jpg/800px-Polarlicht_2.jpg',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Aurora Borealis')).toBeVisible();
    await expect(
      canvas.getByRole('img', { name: /Aurora Borealis/i }),
    ).toBeVisible();
  },
};

export const CssCheck: Story = {
  args: {
    title: 'Style Check',
    content: 'This article verifies that CSS is loaded correctly.',
  },
  play: async ({ canvas }) => {
    const container = canvas.getByRole('article');
    // Article.css sets .article-container padding: 1rem
    await expect(getComputedStyle(container).padding).toBe('16px');
  },
};
