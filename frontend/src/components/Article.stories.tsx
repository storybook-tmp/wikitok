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
    title: 'The History of Jazz',
    content:
      'Jazz is a music genre that originated in the African-American communities of New Orleans in the late 19th and early 20th centuries.',
  },
};

export const WithImage: Story = {
  args: {
    title: 'Northern Lights',
    content:
      'The aurora borealis is a natural light display in the sky, predominantly seen in high-latitude regions.',
    image: 'https://placehold.co/600x400',
  },
};
