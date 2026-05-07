import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';

import { Header } from './Header';

const meta = {
  component: Header,
  tags: ['ai-generated'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  args: {
    onLogin: fn(),
    onLogout: fn(),
    onCreateAccount: fn(),
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedIn: Story = {
  args: {
    user: {
      name: 'Jane Doe',
    },
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/welcome/i)).toBeVisible();
    await expect(
      canvas.getByRole('button', { name: /log out/i }),
    ).toBeVisible();
  },
};

export const LoggedOut: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /log in/i })).toBeVisible();
    await expect(canvas.getByRole('button', { name: /sign up/i })).toBeVisible();
  },
};
