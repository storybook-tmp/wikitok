import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { Header } from './Header';

const meta = {
  title: 'AI Generated/Simple/Header',
  component: Header,
  args: {
    onLogin: fn(),
    onLogout: fn(),
    onCreateAccount: fn(),
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedOut: Story = {};

export const LoggedIn: Story = {
  args: {
    user: { name: 'Jane Doe' },
  },
};
