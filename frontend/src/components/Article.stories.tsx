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
    title: 'The Great Barrier Reef',
    content:
      'The Great Barrier Reef is the world\'s largest coral reef system, stretching over 2,300 kilometres.',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('article')).toHaveAttribute('aria-labelledby', 'article-title');
  },
};

export const WithImage: Story = {
  args: {
    title: 'Aurora Borealis',
    content: 'An aurora is a natural light display in Earth\'s sky.',
    image: 'https://placehold.co/600x400/226/white?text=Aurora',
  },
};

export const LongContent: Story = {
  args: {
    title: 'Deep Sea Exploration',
    content:
      'Deep-sea exploration is the investigation of physical, chemical, and biological conditions on the sea bed and in the deep ocean. It involves dives to extreme depths using specially designed submersibles and remotely operated vehicles. The deep sea remains one of the least explored regions on Earth, with vast areas still unmapped and unstudied.',
  },
};

export const CssCheck: Story = {
  args: {
    title: 'CSS Verification',
    content: 'Verifying that Article.css loaded correctly.',
  },
  play: async ({ canvas }) => {
    // Article.css sets .article-container { padding: 1rem } — proves CSS loaded
    const article = canvas.getByRole('article');
    await expect(getComputedStyle(article).padding).toBe('16px');
  },
};
