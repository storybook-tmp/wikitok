import type { Meta, StoryObj } from '@storybook/react';
import Article from './Article';

const meta = {
  title: 'AI Generated/Simple/Article',
  component: Article,
} satisfies Meta<typeof Article>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Introduction to React',
    content: 'React is a JavaScript library for building user interfaces with reusable components and efficient rendering.',
    image: undefined,
  },
};

export const WithImage: Story = {
  args: {
    title: 'React Components',
    content: 'Components are the building blocks of any React application. Each component is responsible for rendering a part of the user interface.',
    image: 'https://via.placeholder.com/300x200',
  },
};
