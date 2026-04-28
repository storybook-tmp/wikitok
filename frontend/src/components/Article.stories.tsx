import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import Article from './Article';
import '../styles/Article.css';

const meta: Meta<typeof Article> = {
  component: Article,
  tags: ['ai-generated'],
};

export default meta;
type Story = StoryObj<typeof Article>;

export const Default: Story = {
  args: {
    title: 'Theory of Relativity',
    content:
      'The theory of relativity usually encompasses two interrelated physics theories by Albert Einstein: special relativity and general relativity.',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('article')).toBeVisible();
    await expect(canvas.getByText('Theory of Relativity')).toBeVisible();
    await expect(
      canvas.getByText(/two interrelated physics theories/),
    ).toBeVisible();
  },
};

export const WithImage: Story = {
  args: {
    title: 'Great Barrier Reef',
    content:
      "The Great Barrier Reef is the world's largest coral reef system composed of over 2,900 individual reefs.",
    image: 'https://placehold.co/600x400/0077be/white?text=Reef',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('article')).toBeVisible();
    await expect(
      canvas.getByAltText('Illustration for article: Great Barrier Reef'),
    ).toBeVisible();
  },
};

export const CssCheck: Story = {
  args: {
    title: 'Submit',
    content: 'Article content for style check.',
  },
  play: async ({ canvas }) => {
    const article = canvas.getByRole('article');
    await expect(getComputedStyle(article).padding).toBe('16px');
  },
};
