import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import { Header } from './Header';

const meta = {
  title: 'AI Generated/Simple/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    onCreateAccount: fn(),
    onLogin: fn(),
    onLogout: fn(),
  },
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

export const LoggedOut: Story = {};

export const LoggedIn: Story = {
  args: {
    user: {
      name: 'Morgan Lee',
    },
  },
};

export const WelcomeBack: Story = {
  args: {
    user: {
      name: 'Avery',
    },
  },
};
