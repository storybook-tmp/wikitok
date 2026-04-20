import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import Article from './Article';

const meta = {
  component: Article,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Article>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TextOnly: Story = {
  args: {
    title: 'Encyclopedia Entry',
    content:
      'A compact article preview keeps the title and extract together for quick scanning.',
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('article', { name: /encyclopedia entry/i })
    ).toBeVisible();
    await expect(canvas.getByLabelText('Article content')).toHaveTextContent(
      /compact article preview/i
    );
  },
};

export const WithImage: Story = {
  args: {
    title: 'Illustrated Entry',
    content:
      'When an image is available, the preview includes it before the article extract.',
    image: '/wiki-logo.svg',
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('img', { name: /illustration for article: illustrated entry/i })
    ).toBeVisible();
    await expect(canvas.getByRole('heading', { name: /illustrated entry/i })).toBeVisible();
  },
};
