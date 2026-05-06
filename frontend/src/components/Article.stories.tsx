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
    title: 'Quantum Mechanics',
    content:
      'Quantum mechanics is a fundamental theory in physics that describes the behavior of nature at and below the scale of atoms.',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('article')).toBeVisible();
    await expect(canvas.getByText('Quantum Mechanics')).toBeVisible();
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
    await expect(canvas.getByRole('article')).toBeVisible();
    await expect(
      canvas.getByAltText('Illustration for article: Great Wall of China'),
    ).toBeVisible();
  },
};

export const CssCheck: Story = {
  args: {
    title: 'Style Check',
    content: 'Verifying CSS is loaded correctly.',
  },
  play: async ({ canvas }) => {
    const content = canvas.getByRole('contentinfo');
    await expect(getComputedStyle(content).lineHeight).toBe('24px');
  },
};
