import type { Meta, StoryObj } from '@storybook/react-vite';

import Article from './Article';

const meta = {
  title: 'AI Generated/Simple/Article',
  component: Article,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof Article>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TextOnly: Story = {
  args: {
    title: 'Why forests matter',
    content:
      'Forests regulate climate, shelter wildlife, and support the communities that live around them.',
  },
};

export const WithImage: Story = {
  args: {
    title: 'A walk through autumn',
    content:
      'This article explores how changing leaves, crisp air, and shorter days shape the feeling of autumn.',
    image:
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
  },
};
