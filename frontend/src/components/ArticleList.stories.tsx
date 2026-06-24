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
      {
        id: 1,
        title: 'The Theory of Relativity',
        content:
          'The theory of relativity encompasses two interrelated physics theories by Albert Einstein.',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Portrait_of_Albert_Einstein.jpg/220px-Portrait_of_Albert_Einstein.jpg',
      },
      {
        id: 2,
        title: 'Quantum Mechanics',
        content:
          'Quantum mechanics is a fundamental theory in physics that provides a description of the physical properties of nature at the scale of atoms and subatomic particles.',
      },
      {
        id: 3,
        title: 'The Great Wall of China',
        content:
          'The Great Wall of China is a series of fortifications that were built across the historical northern borders of ancient Chinese states.',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/The_Great_Wall_of_China_at_Jinshanling-edit.jpg/800px-The_Great_Wall_of_China_at_Jinshanling-edit.jpg',
      },
    ],
  },
};

export const Empty: Story = {
  args: {
    articles: [],
  },
};
