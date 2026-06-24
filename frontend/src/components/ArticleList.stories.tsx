import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import type { ArticleProps } from '../types/ArticleProps';
import ArticleList from './ArticleList';

const articles: ArticleProps[] = [
  {
    id: 'aurora',
    title: 'Aurora over the fjord',
    content:
      'A cold-weather system cleared overnight, leaving a luminous curtain of green light hanging over the coastline.',
    image:
      'https://images.unsplash.com/photo-1517821099601-1a1a92d4481e?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'desert',
    title: 'Midday on the salt flats',
    content:
      'Travelers described a mirrored horizon where the ground and sky seemed to fold into each other.',
  },
  {
    id: 'forest',
    title: 'Morning trail report',
    content:
      'Rangers reopened the cedar path after removing fallen branches and reinforcing the boardwalk.',
    image:
      'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=900&q=80',
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

export const BrowseList: Story = {};

export const ShortList: Story = {
  args: {
    articles: articles.slice(0, 2),
  },
};
