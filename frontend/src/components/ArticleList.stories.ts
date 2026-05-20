import type { Meta, StoryObj } from '@storybook/react';
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
      { title: 'First Article', content: 'Content of the first article.' },
      { title: 'Second Article', content: 'Content of the second article.' },
      { title: 'Third Article', content: 'Content of the third article.' },
    ],
  },
};

export const WithImages: Story = {
  args: {
    articles: [
      {
        title: 'Article with Image',
        content: 'This article has an associated image.',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/512px-React-icon.svg.png',
      },
      {
        title: 'Plain Article',
        content: 'This article has no image, just text content.',
      },
    ],
  },
};
