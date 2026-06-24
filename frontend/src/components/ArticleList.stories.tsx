import type { Meta, StoryObj } from '@storybook/react-vite';
import ArticleList from './ArticleList';
import type { ArticleProps } from '../types/ArticleProps';

const meta = {
  title: 'AI Generated/Medium/ArticleList',
  component: ArticleList,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ArticleList>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleArticles: ArticleProps[] = [
  {
    id: 1,
    title: 'The History of Computing',
    content:
      'Computing history spans several decades, beginning with mechanical devices and evolving through transistors and integrated circuits to modern microprocessors.',
  },
  {
    id: 2,
    title: 'Quantum Physics Explained',
    content:
      'Quantum physics is the study of matter and energy at the most fundamental level. It describes the behavior of particles at the atomic and subatomic scale.',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Hydrogen_Density_Plots.png/320px-Hydrogen_Density_Plots.png',
  },
  {
    id: 3,
    title: 'The Amazon Rainforest',
    content:
      'The Amazon rainforest is the world\'s largest tropical rainforest, covering most of the Amazon basin in South America.',
  },
];

export const Default: Story = {
  args: {
    articles: sampleArticles,
  },
};

export const WithSelectionHandler: Story = {
  args: {
    articles: sampleArticles,
    onArticleSelect: (article: ArticleProps) => console.log('Selected:', article.title),
  },
};
