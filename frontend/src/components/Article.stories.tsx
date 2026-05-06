import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import Article from './Article';

const meta = {
  component: Article,
  tags: ['ai-generated'],
} satisfies Meta<typeof Article>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'The History of Jazz',
    content:
      'Jazz is a music genre that originated in the African-American communities of New Orleans, Louisiana in the late 19th and early 20th centuries.',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /the history of jazz/i })).toBeVisible();
    await expect(canvas.getByLabelText('Article content')).toHaveTextContent(/jazz is a music genre/i);
  },
};

export const WithImage: Story = {
  args: {
    title: 'Northern Lights',
    content: 'The aurora borealis is a natural light display in the sky.',
    image: 'https://via.placeholder.com/400x300',
  },
};

export const LongContent: Story = {
  args: {
    title: 'Deep Sea Exploration',
    content:
      'Deep-sea exploration is the investigation of physical, chemical, and biological conditions on the ocean floor for scientific or commercial purposes. It began when researchers started diving to observe undersea life. The Mariana Trench is the deepest part of the ocean at nearly 11,000 meters.',
  },
};
