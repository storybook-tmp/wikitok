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
    title: 'Solar System',
    content:
      'The Solar System is the gravitationally bound system of the Sun and the objects that orbit it.',
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('heading', { name: /solar system/i })
    ).toBeVisible();
    await expect(canvas.getByText(/gravitationally bound/i)).toBeVisible();
  },
};

export const WithImage: Story = {
  args: {
    title: 'Great Wall of China',
    content:
      'The Great Wall of China is a series of fortifications built across the historical northern borders of ancient Chinese states.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/The_Great_Wall_of_China_at_Jinshanling-edit.jpg/800px-The_Great_Wall_of_China_at_Jinshanling-edit.jpg',
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('heading', { name: /great wall/i })
    ).toBeVisible();
    await expect(
      canvas.getByRole('img', { name: /illustration for article/i })
    ).toBeVisible();
  },
};

export const CssCheck: Story = {
  args: {
    title: 'CSS Verification',
    content: 'Verifying that Article.css is loaded correctly.',
  },
  play: async ({ canvas }) => {
    const article = canvas.getByRole('article');
    // article-container uses padding: 1rem (16px) from Article.css
    await expect(getComputedStyle(article).padding).toBe('16px');
  },
};
