import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta = {
  title: 'AI Generated/Simple/Button',
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Click me',
  },
};

export const Primary: Story = {
  args: {
    label: 'Primary Button',
    primary: true,
  },
};

export const Large: Story = {
  args: {
    label: 'Large Button',
    size: 'large',
  },
};
