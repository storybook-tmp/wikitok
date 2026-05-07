import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import Article from './Article';

const meta = {
  component: Article,
  tags: ['ai-generated'],
  args: {
    title: 'Accessible article cards',
    content:
      'A concise article preview with a labelled heading and content region.',
  },
} satisfies Meta<typeof Article>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TextOnly: Story = {
  play: async ({ canvas }) => {
    const article = canvas.getByRole('article');
    await expect(article).toHaveAttribute('aria-labelledby', 'article-title');
  },
};

export const WithImage: Story = {
  args: {
    image: '/wiki-logo.svg',
  },
};
