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
      'An aurora borealis is a natural light display predominantly seen in high-latitude regions around the Arctic.',
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
      'The Great Wall of China is a series of fortifications built across the historical northern borders of ancient Chinese states.',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/The_Great_Wall_of_China_at_Jinshanling-edit.jpg/800px-The_Great_Wall_of_China_at_Jinshanling-edit.jpg',
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('heading', { name: /great wall of china/i })
    ).toBeVisible();
    await expect(
      canvas.getByRole('img', { name: /illustration for article: great wall of china/i })
    ).toBeVisible();
    await expect(canvas.getByText(/series of fortifications/i)).toBeVisible();
  },
};

export const LongContent: Story = {
  args: {
    title: 'Deep Ocean Exploration',
    content:
      'Deep ocean exploration involves investigating the deepest parts of the ocean using submersible vehicles, remotely operated vehicles, and autonomous underwater vehicles. The ocean floor contains unique ecosystems, hydrothermal vents, and geological formations. Scientists have discovered thousands of new species in the deep ocean, many of which exhibit bioluminescence and other remarkable adaptations to extreme pressure and darkness.',
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('heading', { name: /deep ocean exploration/i })
    ).toBeVisible();
    await expect(canvas.getByText(/bioluminescence/i)).toBeVisible();
  },
};
