import type { Meta, StoryObj } from '@storybook/react-vite';

import Article from './Article';
import { featureArticle } from '../storybook/fixtures';

const meta = {
  title: 'AI Generated/Simple/Article',
  component: Article,
  parameters: {
    layout: 'padded',
  },
  args: featureArticle,
} satisfies Meta<typeof Article>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLongContent: Story = {
  args: {
    title: 'Field Notes from an Urban Wetland',
    content:
      'Urban wetlands often serve as flood buffers, biodiversity pockets, and community recreation areas. Their value is ecological, social, and practical, especially in dense neighborhoods where green space is limited.',
    image:
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
  },
};
