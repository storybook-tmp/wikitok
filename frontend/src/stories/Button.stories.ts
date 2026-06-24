import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import { Button } from './Button';

const meta = {
  title: 'AI Generated/Simple/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 'Read article',
    size: 'medium',
  },
};

export const Secondary: Story = {
  args: {
    label: 'Save for later',
    size: 'medium',
  },
};

export const Accent: Story = {
  args: {
    backgroundColor: '#111827',
    label: 'Open collection',
    primary: true,
    size: 'large',
  },
};
