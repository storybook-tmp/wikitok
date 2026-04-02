import type { Meta, StoryObj } from '@storybook/react-vite';
import { LoadingSpinner } from './LoadingSpinner';

const meta = {
  title: 'AI Generated/Simple/LoadingSpinner',
  component: LoadingSpinner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LoadingSpinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Small: Story = {
  args: {
    size: 'small',
    label: 'Loading...',
  },
};

export const Medium: Story = {
  args: {
    size: 'medium',
    label: 'Loading...',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    label: 'Loading...',
  },
};

export const WithoutLabel: Story = {
  args: {
    size: 'medium',
  },
};
