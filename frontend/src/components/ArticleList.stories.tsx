import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';
import ArticleList from './ArticleList';
import '../styles/Article.css';

const articles = [
  {
    id: 1,
    title: 'Frontend tooling',
    content: 'Modern frontend tooling helps teams build and verify interfaces quickly.',
    image: '/wiki-logo.svg',
  },
  {
    id: 2,
    title: 'Accessibility',
    content: 'Accessible interfaces expose meaningful names, roles, and keyboard behavior.',
  },
  {
    id: 3,
    title: 'Interaction testing',
    content: 'Interaction tests verify important user behavior in the rendered component.',
  },
];

const meta = {
  component: ArticleList,
  args: {
    articles,
    onArticleSelect: fn(),
  },
  tags: ['ai-generated'],
} satisfies Meta<typeof ArticleList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Populated: Story = {
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('listitem', { name: 'Article: Frontend tooling' }));
    await expect(args.onArticleSelect).toHaveBeenCalledWith(articles[0]);
  },
};

export const KeyboardSelection: Story = {
  play: async ({ args, canvas, userEvent }) => {
    const item = canvas.getByRole('listitem', { name: 'Article: Accessibility' });

    item.focus();
    await userEvent.keyboard('{Enter}');
    await expect(args.onArticleSelect).toHaveBeenCalledWith(articles[1]);
  },
};

export const Empty: Story = {
  args: {
    articles: [],
  },
};
