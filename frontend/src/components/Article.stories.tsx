import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import Article from './Article';

const meta = {
  component: Article,
} satisfies Meta<typeof Article>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Mount Everest',
    content:
      "Mount Everest is Earth's highest mountain above sea level, located in the Mahalangur Himal sub-range of the Himalayas.",
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /mount everest/i })).toBeVisible();
    await expect(canvas.getByRole('contentinfo')).toBeVisible();
  },
};

export const WithImage: Story = {
  args: {
    title: 'Great Barrier Reef',
    content:
      "The Great Barrier Reef is the world's largest coral reef system, composed of over 2,900 individual reefs and 900 islands.",
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Coral_reef_at_palmyra.jpg/800px-Coral_reef_at_palmyra.jpg',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /great barrier reef/i })).toBeVisible();
    await expect(canvas.getByRole('img', { name: /illustration for article/i })).toBeVisible();
  },
};

export const LongContent: Story = {
  args: {
    title: 'Amazon River',
    content: [
      'The Amazon River is the largest river in the world by discharge volume of water.',
      "It is the largest drainage basin in the world, and accounts for approximately one-fifth of the world's total river flow.",
      'The Amazon basin is home to the Amazon rainforest, also known as Amazonia.',
      "The rainforest represents over half of the planet's remaining rainforests, and comprises the largest and most biodiverse tract of tropical rainforest in the world.",
      'More than 30 million people of 350 different ethnic groups live in Amazonia.',
    ].join(' '),
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('article')).toBeVisible();
    await expect(canvas.getByRole('heading', { name: /amazon river/i })).toBeVisible();
  },
};
