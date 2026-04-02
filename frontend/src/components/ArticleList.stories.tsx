import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import ArticleList from './ArticleList';

const meta = {
  title: 'AI Generated/Medium/ArticleList',
  component: ArticleList,
  args: {
    onArticleSelect: fn(),
  },
} satisfies Meta<typeof ArticleList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    articles: [
      {
        title: 'The History of Computing',
        content: 'Computing has evolved from simple mechanical calculators to powerful quantum computers.',
      },
      {
        title: 'Northern Lights',
        content: 'The aurora borealis is a natural light display seen in high-latitude regions.',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Polarlicht_2.jpg/320px-Polarlicht_2.jpg',
      },
      {
        title: 'Deep Sea Exploration',
        content: 'The ocean floor remains one of the least explored areas on Earth.',
      },
    ],
  },
};

export const SingleArticle: Story = {
  args: {
    articles: [
      {
        title: 'Quantum Physics',
        content: 'Quantum mechanics describes the behavior of particles at the smallest scales.',
      },
    ],
  },
};
