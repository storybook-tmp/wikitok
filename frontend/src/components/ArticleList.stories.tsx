import type { Meta, StoryObj } from '@storybook/react-vite';
import ArticleList from './ArticleList';

const meta = {
  title: 'AI Generated/Simple/ArticleList',
  component: ArticleList,
} satisfies Meta<typeof ArticleList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    articles: [
      {
        title: 'Quantum Mechanics',
        content:
          'Quantum mechanics is a fundamental theory in physics that describes nature at the smallest scales.',
      },
      {
        title: 'General Relativity',
        content:
          'General relativity is the geometric theory of gravitation published by Albert Einstein in 1915.',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Spacetime_curvature.png/800px-Spacetime_curvature.png',
      },
      {
        title: 'String Theory',
        content:
          'String theory proposes that the fundamental constituents of the universe are one-dimensional strings rather than point-like particles.',
      },
    ],
  },
};

export const SingleArticle: Story = {
  args: {
    articles: [
      {
        title: 'The Art of Typography',
        content:
          'Typography is the art and technique of arranging type to make written language legible, readable and appealing.',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Metal_movable_type.jpg/800px-Metal_movable_type.jpg',
      },
    ],
  },
};
