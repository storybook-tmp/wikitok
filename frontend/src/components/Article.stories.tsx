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
    title: 'Aurora Borealis',
    content:
      'An aurora, also commonly known as the northern lights, is a natural light display in Earth\'s sky, predominantly seen in high-latitude regions.',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('article')).toBeVisible();
    await expect(canvas.getByText('Aurora Borealis')).toBeVisible();
    await expect(canvas.getByText(/natural light display/)).toBeVisible();
  },
};

export const WithImage: Story = {
  args: {
    title: 'Great Wall of China',
    content:
      'The Great Wall of China is a series of fortifications that were built across the historical northern borders of ancient Chinese states.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/The_Great_Wall_of_China_at_Jinshanling-edit.jpg/800px-The_Great_Wall_of_China_at_Jinshanling-edit.jpg',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('article')).toBeVisible();
    await expect(canvas.getByText('Great Wall of China')).toBeVisible();
    await expect(canvas.getByRole('img')).toBeVisible();
    await expect(canvas.getByRole('img')).toHaveAttribute(
      'alt',
      'Illustration for article: Great Wall of China',
    );
  },
};

export const LongContent: Story = {
  args: {
    title: 'Comprehensive Article',
    content:
      'This is a longer article with more detailed content. It covers multiple topics and provides in-depth information about the subject matter, demonstrating how the Article component handles larger blocks of text.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Octopus2.jpg/800px-Octopus2.jpg',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('article')).toBeVisible();
    await expect(canvas.getByText('Comprehensive Article')).toBeVisible();
    await expect(canvas.getByRole('img')).toBeVisible();
    await expect(canvas.getByText(/multiple topics/)).toBeVisible();
  },
};
