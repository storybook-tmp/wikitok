import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import Article from './Article';

const meta = {
  component: Article,
  args: {
    title: 'Aurora over Alaska',
    content:
      'A ribbon of green light bends over Denali National Park while winter clouds lift off the mountain range.',
  },
} satisfies Meta<typeof Article>;

export default meta;

type Story = StoryObj<typeof meta>;

export const TextOnly: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('article')).toBeVisible();
    await expect(canvas.getByRole('heading', { name: /aurora over alaska/i })).toBeVisible();
    await expect(canvas.getByText(/green light bends over denali national park/i)).toBeVisible();
  },
};

export const WithIllustration: Story = {
  args: {
    image:
      'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns%3D%22http%3A//www.w3.org/2000/svg%22 width%3D%22640%22 height%3D%22360%22 viewBox%3D%220 0 640 360%22%3E%3Crect width%3D%22640%22 height%3D%22360%22 fill%3D%22%230f172a%22/%3E%3Ccircle cx%3D%22490%22 cy%3D%2290%22 r%3D%2260%22 fill%3D%22%233b82f6%22 fill-opacity%3D%220.55%22/%3E%3Cpath d%3D%22M0 260 C120 210 220 310 340 250 S520 210 640 250 V360 H0 Z%22 fill%3D%22%2322c55e%22 fill-opacity%3D%220.55%22/%3E%3C/svg%3E',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('img', { name: /illustration for article: aurora over alaska/i })).toBeVisible();
    await expect(canvas.getByRole('contentinfo', { name: /article content/i })).toBeVisible();
  },
};

export const LongForm: Story = {
  args: {
    title: 'Night Market Orchestra',
    content:
      'Street musicians rehearse among food stalls, layering folk melodies with improvised percussion from market vendors. The resulting soundscape shifts across the evening as new performers arrive and the crowd density changes.',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /night market orchestra/i })).toBeVisible();
    await expect(canvas.getByText(/layering folk melodies with improvised percussion/i)).toBeVisible();
  },
};
