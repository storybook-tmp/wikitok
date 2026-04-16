import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import { Button } from './Button';

const meta = {
  title: 'AI Generated/Simple/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Explore wiki',
  },
};

export const Primary: Story = {
  args: {
    primary: true,
    label: 'Save article',
  },
};

export const Accent: Story = {
  args: {
    backgroundColor: '#1d4ed8',
    label: 'Load more',
    size: 'large',
  },
};
