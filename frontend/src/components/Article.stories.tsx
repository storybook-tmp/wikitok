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
    title: 'Sample Wikipedia Article',
    content:
      'Wikipedia is a free online encyclopedia that anyone can edit. It was launched on January 15, 2001, and has grown to become one of the most visited websites in the world.',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Wikipedia-logo-v2.svg/220px-Wikipedia-logo-v2.svg.png',
  },
};

export const WithoutImage: Story = {
  args: {
    title: 'Text Only Article',
    content: 'This article has no image, only text content for display.',
  },
};
