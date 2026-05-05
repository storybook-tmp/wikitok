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
      'The Solar System is the gravitationally bound system of the Sun and the objects that orbit it. The largest of such objects are the eight planets.',
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('heading', { name: /solar system/i }),
    ).toBeVisible();
    await expect(canvas.getByText(/gravitationally bound/i)).toBeVisible();
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
    await expect(
      canvas.getByRole('heading', { name: /great wall of china/i }),
    ).toBeVisible();
    await expect(
      canvas.getByAltText(/illustration for article: great wall of china/i),
    ).toBeVisible();
  },
};

export const LongContent: Story = {
  args: {
    title: 'History of Science',
    content:
      'The history of science covers the development of science from ancient times to the present. It encompasses all three major branches of science: natural, social, and formal. Science in the broadest sense existed before the modern era and in many historical civilizations. Modern science is distinct in its approach and successful in its results.',
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('heading', { name: /history of science/i }),
    ).toBeVisible();
    const contentElement = canvas.getByRole('contentinfo');
    await expect(contentElement).toBeVisible();
    await expect(contentElement.textContent).toContain('development of science');
  },
};
