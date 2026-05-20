import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Button } from '../stories/Button';

const meta = {
  title: 'AI Generated/Simple/Button',
  component: Button,
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 'Click me',
  },
};

export const Secondary: Story = {
  args: {
    primary: false,
    label: 'Click me',
  },
};
