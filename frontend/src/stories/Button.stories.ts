import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

const meta = {
  title: 'AI Generated/Simple/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: 'Click me',
    primary: true,
  },
};

export const Secondary: Story = {
  args: {
    label: 'Learn more',
    primary: false,
  },
};

export const Large: Story = {
  args: {
    label: 'Large Button',
    size: 'large',
    primary: true,
  },
};

export const Small: Story = {
  args: {
    label: 'Small Button',
    size: 'small',
  },
};
