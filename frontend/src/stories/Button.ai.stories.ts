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

export const PrimaryCallToAction: Story = {
  args: {
    primary: true,
    label: 'Start reading',
    size: 'large',
  },
};

export const SecondaryCompact: Story = {
  args: {
    label: 'Maybe later',
    size: 'small',
    backgroundColor: '#f3f4f6',
  },
};
