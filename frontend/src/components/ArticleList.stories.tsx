import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import ArticleList from './ArticleList';

const meta = {
  title: 'AI Generated/Medium/ArticleList',
  component: ArticleList,
  parameters: {
    layout: 'padded',
  },
  args: {
    onArticleSelect: fn(),
  },
} satisfies Meta<typeof ArticleList>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleArticles = [
  {
    id: 'rainforests',
    title: 'Rainforests',
    content: 'Dense tropical forests known for high biodiversity and constant rainfall.',
    image:
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'mountains',
    title: 'Mountain ranges',
    content: 'Elevated landforms shaped by tectonic forces, erosion, and climate.',
  },
  {
    id: 'oceans',
    title: 'Ocean currents',
    content: 'Large-scale flows of seawater that help regulate weather and marine ecosystems.',
  },
];

export const Default: Story = {
  args: {
    articles: sampleArticles,
  },
};

export const WithImages: Story = {
  args: {
    articles: sampleArticles.map((article, index) => ({
      ...article,
      image:
        article.image ??
        `https://picsum.photos/seed/article-list-${index + 1}/800/500`,
    })),
  },
};
