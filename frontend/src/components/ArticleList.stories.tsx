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
        title: 'First Article',
        content: 'Content of the first article about science.',
      },
      {
        title: 'Second Article',
        content: 'Content of the second article about history.',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Wikipedia-logo-v2.svg/220px-Wikipedia-logo-v2.svg.png',
      },
      {
        title: 'Third Article',
        content: 'Content of the third article about technology.',
      },
    ],
  },
};

export const Empty: Story = {
  args: {
    articles: [],
  },
};
