import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import Article from './Article';

const meta = {
  component: Article,
  tags: ['ai-generated'],
} satisfies Meta<typeof Article>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TextOnly: Story = {
  args: {
    title: 'Apollo Guidance Computer',
    content:
      'The Apollo Guidance Computer provided onboard computation for guidance, navigation, and control.',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('article')).toHaveAttribute(
      'aria-labelledby',
      'article-title'
    );
  },
};

export const WithImage: Story = {
  args: {
    title: 'Deep Space Network',
    content:
      'The Deep Space Network supports interplanetary spacecraft missions and radio astronomy observations.',
    image:
      'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22640%22 height=%22360%22 viewBox=%220 0 640 360%22%3E%3Crect width=%22640%22 height=%22360%22 fill=%22%230f172a%22/%3E%3Ccircle cx=%22500%22 cy=%2280%22 r=%2240%22 fill=%22%23eab308%22/%3E%3Cpath d=%22M140 280l90-150 90 150z%22 fill=%22%2394a3b8%22/%3E%3C/svg%3E',
  },
};
