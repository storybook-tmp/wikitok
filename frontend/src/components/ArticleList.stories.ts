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
      {
        title: 'The History of Computing',
        content: 'Computing has evolved from mechanical calculators to modern devices.',
      },
      {
        title: 'Space Exploration',
        content: 'Humanity has been exploring space since the launch of Sputnik in 1957.',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/GPN-2000-001106.jpg/320px-GPN-2000-001106.jpg',
      },
      {
        title: 'Ocean Conservation',
        content: 'Protecting our oceans is vital for maintaining biodiversity and climate stability.',
      },
    ],
  },
};

export const Empty: Story = {
  args: {
    articles: [],
  },
};
