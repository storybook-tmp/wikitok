import type { Meta, StoryObj } from '@storybook/react-vite';
import ArticleList from './ArticleList';

const meta = {
  title: 'AI Generated/Medium/ArticleList',
  component: ArticleList,
} satisfies Meta<typeof ArticleList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    articles: [
      { id: 1, title: 'Quantum Mechanics', content: 'Quantum mechanics is a fundamental theory in physics.' },
      { id: 2, title: 'Deep Learning', content: 'Deep learning is part of machine learning methods.' },
      { id: 3, title: 'The Renaissance', content: 'The Renaissance was a period of cultural rebirth in Europe.' },
    ],
  },
};

export const SingleArticle: Story = {
  args: {
    articles: [
      { id: 1, title: 'Astronomy', content: 'Astronomy is the scientific study of celestial objects.' },
    ],
  },
};
