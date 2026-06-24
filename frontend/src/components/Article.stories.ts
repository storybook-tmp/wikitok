import type { Meta, StoryObj } from '@storybook/react-vite';
import Article from './Article';

const meta = {
  title: 'AI Generated/Simple/Article',
  component: Article,
} satisfies Meta<typeof Article>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Sample Article',
    content:
      'This is the content of a sample article that demonstrates the Article component rendering text.',
  },
};

export const WithImage: Story = {
  args: {
    title: 'Article With Image',
    content:
      'This article includes an image to demonstrate the full component layout with all optional props.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Camponotus_flavomarginatus_ant.jpg/250px-Camponotus_flavomarginatus_ant.jpg',
  },
};
