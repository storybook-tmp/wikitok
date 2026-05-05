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

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(await canvas.findByText('WikiTok', {}, { timeout: 5000 })).toBeVisible();
  },
};

export const AboutDialog: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: /about/i }));
    await expect(canvas.getByText(/about wikitok/i)).toBeVisible();
  },
};

export const LikesPanel: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: /likes/i }));
    await expect(canvas.getByRole('heading', { name: /liked articles/i })).toBeVisible();
    await expect(canvas.getByPlaceholderText(/search liked articles/i)).toBeVisible();
  },
};
