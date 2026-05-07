import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';
import App from './App';

const meta = {
  component: App,
  tags: ['ai-generated'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof App>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FeedLoadsMockedArticles: Story = {
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('button', { name: /wikitok/i }),
    ).toBeVisible();
    await expect(
      await canvas.findByRole('heading', { name: /apollo program/i }),
    ).toBeVisible();
    await expect(canvas.getByText(/human spaceflight program/i)).toBeVisible();
  },
};

export const OpensLikedArticles: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: /likes/i }));

    await expect(
      canvas.getByRole('heading', { name: /liked articles/i }),
    ).toBeVisible();
    await expect(
      canvas.getByRole('link', { name: /seeded storybook favorite/i }),
    ).toBeVisible();
  },
};

export const FiltersLikedArticles: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: /likes/i }));
    await userEvent.type(
      canvas.getByPlaceholderText(/search liked articles/i),
      'not present',
    );

    await waitFor(async () => {
      await expect(canvas.getByText(/no matches found/i)).toBeVisible();
    });
  },
};
