import type { Meta, StoryObj } from '@storybook/react-vite';
import ArticleList from './ArticleList';

const mockArticles = [
  {
    id: 1,
    title: 'Monarch Butterfly',
    content:
      'The monarch butterfly is a milkweed butterfly in the family Nymphalidae.',
  },
  {
    id: 2,
    title: 'Great Wall of China',
    content:
      'The Great Wall of China is a series of fortifications built across the historical northern borders.',
  },
  {
    id: 3,
    title: 'Nikola Tesla',
    content:
      'Nikola Tesla was a Serbian-American inventor best known for his contributions to AC electricity.',
  },
];

const meta = {
  component: ArticleList,
} satisfies Meta<typeof ArticleList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <ArticleList articles={mockArticles} />,
};

export const SingleArticle: Story = {
  render: () => <ArticleList articles={[mockArticles[0]]} />,
};

export const WithImages: Story = {
  render: () => (
    <ArticleList
      articles={[
        {
          id: 1,
          title: 'Monarch Butterfly',
          content: 'The monarch butterfly is a milkweed butterfly in the family Nymphalidae.',
          image:
            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200'%3E%3Crect width='400' height='200' fill='%231e3a5f'/%3E%3C/svg%3E",
        },
        {
          id: 2,
          title: 'Great Wall of China',
          content: 'The Great Wall of China is a series of fortifications.',
          image:
            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200'%3E%3Crect width='400' height='200' fill='%231e5f3a'/%3E%3C/svg%3E",
        },
      ]}
    />
  ),
};
