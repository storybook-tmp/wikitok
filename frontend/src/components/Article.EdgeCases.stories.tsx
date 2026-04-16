import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import Article from './Article';

const meta = {
  component: Article,
} satisfies Meta<typeof Article>;

export default meta;
type Story = StoryObj<typeof meta>;

export const EmptyTitle: Story = {
  args: {
    title: '',
    content: 'This article has no title.',
  },
  play: async ({ canvas }) => {
    // Check that content is still visible
    const content = canvas.getByText(/This article has no title/i);
    await expect(content).toBeVisible();
  },
};

export const VeryLongTitle: Story = {
  args: {
    title: 'This is an exceptionally long and detailed article title that contains multiple concepts and might wrap across several lines depending on the screen width and layout constraints',
    content: 'Article with very long title.',
  },
  play: async ({ canvas }) => {
    // Check that the long title is rendered
    const content = canvas.getByText(/This is an exceptionally long/i);
    await expect(content).toBeVisible();
  },
};

export const SpecialCharactersInTitle: Story = {
  args: {
    title: 'C++ & C# Programming: Best Practices & Examples',
    content: 'Learn about multiple programming languages and their practical applications.',
  },
  play: async ({ canvas }) => {
    // Check that special characters are properly rendered
    const title = canvas.getByRole('heading', { name: /C\+\+ & C#/i });
    await expect(title).toBeVisible();
  },
};

export const HTMLContent: Story = {
  args: {
    title: 'Article Title',
    content: 'Content with <strong>bold</strong> and <em>italic</em> text.',
  },
  play: async ({ canvas }) => {
    // Content should be rendered as-is (not interpreted as HTML)
    const content = canvas.getByText(/Content with <strong>bold/i);
    await expect(content).toBeVisible();
  },
};

export const MultilineContent: Story = {
  args: {
    title: 'Poetry Article',
    content: `Line one of a poem
    Line two of a poem
    Line three of a poem
    Line four of a poem`,
  },
  play: async ({ canvas }) => {
    // Check that multiline content is preserved
    const content = canvas.getByText(/Line one of a poem/i);
    await expect(content).toBeVisible();
  },
};
