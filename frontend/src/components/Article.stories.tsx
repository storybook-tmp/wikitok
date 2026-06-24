import type { Meta, StoryObj } from '@storybook/react-vite';

import Article from './Article';

const meta = {
  title: 'AI Generated/Simple/Article',
  component: Article,
  parameters: {
    layout: 'padded',
  },
  args: {
    title: 'The joy of slow reading',
    content:
      'Taking a few extra minutes with a good article can turn a quick skim into a memorable idea.',
  },
} satisfies Meta<typeof Article>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithImage: Story = {
  args: {
    image:
      'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=900&q=80',
  },
};
