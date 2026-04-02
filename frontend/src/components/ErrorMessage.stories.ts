import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { ErrorMessage } from './ErrorMessage';

const meta = {
  title: 'AI Generated/Simple/ErrorMessage',
  component: ErrorMessage,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onDismiss: fn(),
  },
} satisfies Meta<typeof ErrorMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Error',
    message: 'Something went wrong. Please try again.',
  },
};

export const WithoutTitle: Story = {
  args: {
    message: 'An unexpected error occurred while loading the data.',
  },
};
