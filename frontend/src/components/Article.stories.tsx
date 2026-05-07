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
    title: 'Library of Alexandria',
    content:
      'The Library of Alexandria was one of the largest and most significant libraries of the ancient world.',
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('heading', { name: /library of alexandria/i }),
    ).toBeVisible();
    await expect(canvas.getByRole('contentinfo')).toHaveTextContent(
      /ancient world/i,
    );
  },
};

export const WithImage: Story = {
  args: {
    title: 'Mount Fuji',
    content:
      'Mount Fuji is an active stratovolcano and one of Japan’s most recognizable landmarks.',
    image:
      'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20400%20250%22%3E%3Crect%20width%3D%22400%22%20height%3D%22250%22%20fill%3D%22%230f766e%22%2F%3E%3Ctext%20x%3D%22200%22%20y%3D%22135%22%20text-anchor%3D%22middle%22%20font-family%3D%22Arial%22%20font-size%3D%2228%22%20fill%3D%22white%22%3EMount%20Fuji%3C%2Ftext%3E%3C%2Fsvg%3E',
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('img', { name: /illustration for article: mount fuji/i }),
    ).toBeVisible();
    await expect(canvas.getByRole('article')).toBeVisible();
  },
};

export const CssCheck: Story = {
  args: {
    title: 'CSS Check',
    content: 'The article CSS file gives the article container its padding.',
  },
  play: async ({ canvas }) => {
    const article = canvas.getByRole('article');

    await expect(getComputedStyle(article).paddingTop).toBe('16px');
  },
};
