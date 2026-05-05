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
    title: 'The History of Computing',
    content:
      'The history of computing is longer than the history of computing hardware and modern computing technology and includes the history of methods intended for pen and paper.',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('article')).toBeVisible();
    await expect(canvas.getByText('The History of Computing')).toBeVisible();
  },
};

export const WithImage: Story = {
  args: {
    title: 'Mount Everest',
    content:
      'Mount Everest is the highest mountain above sea level, located in the Mahalangur Himal sub-range of the Himalayas.',
    image: 'https://placehold.co/400x300/333/white?text=Mount+Everest',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('article')).toBeVisible();
    await expect(
      canvas.getByAltText('Illustration for article: Mount Everest'),
    ).toBeVisible();
  },
};

export const CssCheck: Story = {
  args: {
    title: 'CSS Verification',
    content: 'This story verifies that the Article CSS is loaded correctly.',
  },
  play: async ({ canvas }) => {
    const article = canvas.getByRole('article');
    await expect(getComputedStyle(article).padding).toBe('16px');
  },
};
