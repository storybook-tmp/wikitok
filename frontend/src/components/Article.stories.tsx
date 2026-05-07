import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import Article from './Article';

const meta = {
  component: Article,
  parameters: {
    layout: 'padded',
  },
  tags: ['ai-generated'],
} satisfies Meta<typeof Article>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TextOnly: Story = {
  args: {
    title: 'Component Isolation',
    content:
      'A focused story keeps the article markup readable without requiring the full feed.',
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('article', { name: /Component Isolation/i }),
    ).toBeVisible();
    await expect(canvas.getByLabelText('Article content')).toHaveTextContent(
      /focused story/i,
    );
    await expect(canvas.queryByRole('img')).not.toBeInTheDocument();
  },
};

export const WithImage: Story = {
  args: {
    title: 'Wikipedia Preview',
    content: 'Article cards can include an image above the content body.',
    image: '/wiki-logo.svg',
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('heading', { name: /Wikipedia Preview/i }),
    ).toBeVisible();
    await expect(
      canvas.getByRole('img', { name: /Illustration for article/i }),
    ).toHaveAttribute('src', '/wiki-logo.svg');
  },
};

export const LongContent: Story = {
  args: {
    title: 'Readable Extract',
    content:
      'Longer extracts remain in the article content region so assistive technology can still identify the title and body as a single article.',
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('article', { name: /Readable Extract/i }),
    ).toBeVisible();
    await expect(canvas.getByLabelText('Article content')).toHaveTextContent(
      /assistive technology/i,
    );
  },
};

