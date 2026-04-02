import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import type { ArticleProps } from '../types/ArticleProps';
import ArticleList from './ArticleList';

const articles: ArticleProps[] = [
  {
    id: 'aurora',
    title: 'Aurora Forecast Improves',
    content:
      'Scientists expect brighter aurora activity this winter as solar cycles approach a local peak.',
    image:
      'https://images.unsplash.com/photo-1508261303786-75f0f4290c2e?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'reef',
    title: 'Reef Restoration Efforts Expand',
    content:
      'Coral nurseries along the coast are transplanting resilient fragments to restore damaged reef systems.',
  },
  {
    id: 'trains',
    title: 'Night Trains Return to Popular Routes',
    content:
      'Rail operators are adding sleeper cabins and quiet cars to meet rising demand for lower-carbon travel.',
    image:
      'https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=900&q=80',
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

export const WithMixedMedia: Story = {};

export const TextHeavy: Story = {
  args: {
    articles: articles.map(({ image, ...article }) => article),
  },
};
