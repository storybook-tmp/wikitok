import type { Meta, StoryObj } from '@storybook/react';
import Article from './Article';
import '../styles/Article.css';

const meta = {
  title: 'AI Generated/Simple/Article',
  component: Article,
} satisfies Meta<typeof Article>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'The History of Computing',
    content:
      'Computing has evolved from mechanical calculators to modern quantum computers, transforming every aspect of human life along the way.',
  },
};

export const WithImage: Story = {
  args: {
    title: 'Nature Photography',
    content:
      'Capturing the beauty of the natural world through the lens of a camera has become one of the most popular hobbies worldwide.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/800px-Good_Food_Display_-_NCI_Visuals_Online.jpg',
  },
};
