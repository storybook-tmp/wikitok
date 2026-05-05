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
    title: 'Quantum Computing',
    content:
      'Quantum computing is an area of computing focused on developing computer technology based on the principles of quantum theory.',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Quantum Computing')).toBeVisible();
    await expect(
      canvas.getByText(/Quantum computing is an area/),
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
      canvas.getByRole('img', { name: /illustration for article: aurora borealis/i }),
    ).toBeVisible();
  },
};

export const LongContent: Story = {
  args: {
    title: 'Deep Ocean Exploration',
    content:
      'Deep-sea exploration is the investigation of physical, chemical, and biological conditions on the sea bed for scientific or commercial purposes. It involves diving to depths beyond 200 meters where sunlight cannot penetrate.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Deep_sea_exploration.jpg/800px-Deep_sea_exploration.jpg',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Deep Ocean Exploration')).toBeVisible();
    await expect(canvas.getByRole('img')).toBeVisible();
    await expect(canvas.getByText(/investigation of physical/)).toBeVisible();
  },
};
