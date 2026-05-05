import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import Article from './Article';
import '../styles/Article.css';

const meta = {
  component: Article,
  tags: ['ai-generated'],
} satisfies Meta<typeof Article>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Aurora Borealis',
    content:
      "An aurora, also commonly known as the northern lights, is a natural light display in Earth's sky, predominantly seen in high-latitude regions.",
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('heading', { name: /aurora borealis/i })
    ).toBeVisible();
    await expect(canvas.getByText(/natural light display/i)).toBeVisible();
  },
};

export const WithImage: Story = {
  args: {
    title: 'Great Wall of China',
    content:
      'The Great Wall of China is a series of fortifications that were built across the historical northern borders of ancient Chinese states.',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/The_Great_Wall_of_China_at_Jinshanling-edit.jpg/800px-The_Great_Wall_of_China_at_Jinshanling-edit.jpg',
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('heading', { name: /great wall of china/i })
    ).toBeVisible();
    await expect(
      canvas.getByAltText(/illustration for article: great wall of china/i)
    ).toBeVisible();
  },
};

export const CssCheck: Story = {
  args: {
    title: 'CSS Check Article',
    content: 'Verifying that Article.css styles are loaded.',
  },
  play: async ({ canvas }) => {
    const article = canvas.getByRole('article');
    const style = getComputedStyle(article);
    // .article-container has padding: 1rem = 16px
    await expect(style.padding).toBe('16px');
  },
};
