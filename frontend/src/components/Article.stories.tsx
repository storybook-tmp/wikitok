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
      'Jazz is a music genre that originated in the African-American communities of New Orleans in the late 19th and early 20th centuries.',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('article')).toHaveAccessibleName(
      /the history of jazz/i
    );
  },
};

export const WithImage: Story = {
  args: {
    title: 'Coral Reef Ecosystems',
    content:
      'Coral reefs are diverse underwater ecosystems held together by calcium carbonate structures secreted by corals.',
    image: 'https://placehold.co/600x400/0e4429/ffffff?text=Coral+Reef',
  },
};

export const ShortContent: Story = {
  args: {
    title: 'Brief Note',
    content: 'A short article with minimal content.',
  },
};
