import type { Meta, StoryObj } from '@storybook/react-vite';
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
        title: 'Photo Article',
        content: 'An article with an accompanying image.',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Camponotus_flavomarginatus_ant.jpg/250px-Camponotus_flavomarginatus_ant.jpg',
      },
      {
        title: 'Another Photo',
        content: 'Another article with an image included.',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/PNG_transparency_demonstration_1.png/250px-PNG_transparency_demonstration_1.png',
      },
    ],
  },
};
