import type { Meta, StoryObj } from '@storybook/react-vite';
import ArticleList from './ArticleList';
import '../styles/Article.css';

const meta = {
  title: 'AI Generated/Medium/ArticleList',
  component: ArticleList,
} satisfies Meta<typeof ArticleList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    articles: [
      { title: 'The History of Computing', content: 'Computing has evolved from simple mechanical devices to complex digital systems.' },
      { title: 'Artificial Intelligence', content: 'AI is the simulation of human intelligence processes by computer systems.' },
      { title: 'Space Exploration', content: 'Humans have been exploring space since the launch of Sputnik in 1957.' },
    ],
  },
};

export const SingleArticle: Story = {
  args: {
    articles: [
      { title: 'Quantum Computing', content: 'Quantum computing harnesses quantum mechanical phenomena to process information.' },
    ],
  },
};
