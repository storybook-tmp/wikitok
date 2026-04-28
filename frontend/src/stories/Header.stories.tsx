import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';
import { Header } from './Header';

const meta = {
  title: 'Example/Header',
  component: Header,
  tags: ['ai-generated'],
  parameters: {
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
    await expect(canvas.getByText('Jane Doe')).toBeVisible();
    await expect(canvas.getByRole('button', { name: /log out/i })).toBeVisible();
  },
};

export const LoggedOut: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /log in/i })).toBeVisible();
    await expect(canvas.getByRole('button', { name: /sign up/i })).toBeVisible();
  },
};

export const LoginFlow: Story = {
  play: async ({ canvas, userEvent, args }) => {
    const loginButton = canvas.getByRole('button', { name: /log in/i });
    await userEvent.click(loginButton);
    await expect(args.onLogin).toHaveBeenCalledOnce();
  },
};
