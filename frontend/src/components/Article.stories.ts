import type { Meta, StoryObj } from '@storybook/react-vite';

import '../styles/Article.css';
import Article from './Article';

const meta = {
  title: 'AI Generated/Simple/Article',
  component: Article,
  parameters: {
    layout: 'centered',
  },
  args: {
    title: 'The Solar System',
    content:
      'Our solar system includes the Sun and the objects that orbit it, from planets to comets and dwarf planets.',
  },
} satisfies Meta<typeof Article>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithImage: Story = {
  args: {
    image:
      'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1200&q=80',
  },
};
