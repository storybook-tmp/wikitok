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

export const TextOnly: Story = {
  args: {
    title: 'Ada Lovelace',
    content: 'Ada Lovelace wrote what is often considered the first computer program.',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('article', { name: 'Ada Lovelace' })).toBeVisible();
    await expect(canvas.getByLabelText('Article content')).toHaveTextContent(
      'first computer program'
    );
  },
};

export const WithImage: Story = {
  args: {
    title: 'Analytical Engine',
    content: 'The Analytical Engine was a proposed mechanical general-purpose computer.',
    image: '/wiki-logo.svg',
  },
};

export const LongContent: Story = {
  args: {
    title: 'Computing history',
    content:
      'Mechanical calculation, symbolic reasoning, and programmable machines all shaped the early history of computing.',
  },
};
