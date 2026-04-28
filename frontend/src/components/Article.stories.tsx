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
      "An aurora, also commonly known as the northern lights, is a natural light display in Earth's sky, predominantly seen in high-latitude regions.",
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
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/The_Great_Wall_of_China_at_Jinshanling-edit.jpg/800px-The_Great_Wall_of_China_at_Jinshanling-edit.jpg',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('article')).toBeVisible();
    await expect(canvas.getByText('Great Wall of China')).toBeVisible();
    await expect(
      canvas.getByAltText('Illustration for article: Great Wall of China')
    ).toBeVisible();
  },
};

export const LongContent: Story = {
  args: {
    title: 'History of Science',
    content:
      'The history of science covers the development of science from ancient times to the present. It encompasses all three major branches of science: natural, social, and formal. Science\'s earliest roots can be traced to Ancient Egypt and Mesopotamia around 3000 to 1200 BCE. These civilizations\' contributions to mathematics, astronomy, and medicine entered and shaped the Greek natural philosophy of classical antiquity.',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('article')).toBeVisible();
    await expect(canvas.getByText('History of Science')).toBeVisible();
    await expect(canvas.getByText(/Ancient Egypt/)).toBeVisible();
  },
};

export const CssCheck: Story = {
  args: {
    title: 'CSS Verification',
    content: 'This story verifies that global CSS including Tailwind is loaded.',
  },
  play: async ({ canvas }) => {
    const article = canvas.getByRole('article');
    await expect(article).toBeVisible();
    // Tailwind resets box-sizing to border-box via its preflight styles
    await expect(getComputedStyle(article).boxSizing).toBe('border-box');
  },
};
