import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import ArticleList from './ArticleList';

const articles = [
  {
    id: 1,
    title: 'Designing a calm reading surface',
    content: 'Whitespace, hierarchy, and a strong title treatment help readers orient quickly.',
    image:
      'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 2,
    title: 'Accessibility patterns for article cards',
    content: 'Keyboard support and meaningful labels make list navigation work for more people.',
  },
  {
    id: 3,
    title: 'Progressive enhancement in practice',
    content: 'Start with semantic markup, then layer interaction where it improves the experience.',
  },
];

const meta = {
  title: 'AI Generated/Medium/ArticleList',
  component: ArticleList,
  parameters: {
    layout: 'padded',
  },
  args: {
    articles,
    onArticleSelect: fn(),
  },
} satisfies Meta<typeof ArticleList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SelectableCollection: Story = {
  args: {
    articles: articles.slice(0, 2),
  },
};
