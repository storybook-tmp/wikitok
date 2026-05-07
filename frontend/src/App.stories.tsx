import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
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

export const Feed: Story = {
  play: async ({ canvas }) => {
    await expect(
      await canvas.findByRole('heading', { name: /ada lovelace/i })
    ).toBeVisible();
  },
};

export const AboutDialog: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: /about/i }));
    await expect(
      await canvas.findByRole('heading', { name: /about wikitok/i })
    ).toBeVisible();
  },
};

export const EmptyLikesPanel: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: /likes/i }));
    await expect(
      await canvas.findByPlaceholderText(/search liked articles/i)
    ).toBeVisible();
    await expect(canvas.getByText(/no liked articles yet/i)).toBeVisible();
  },
};
