import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { Modal } from './Modal';

const meta = {
  title: 'AI Generated/Complex/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onClose: fn(),
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {
  args: {
    isOpen: true,
    title: 'Welcome',
    children: 'This is a modal dialog. Click the X button to close it.',
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
    title: 'Welcome',
    children: 'This modal is closed.',
  },
};

export const WithForm: Story = {
  args: {
    isOpen: true,
    title: 'User Settings',
    children: (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors">
          Save Settings
        </button>
      </div>
    ),
  },
};

export const Large: Story = {
  args: {
    isOpen: true,
    title: 'Large Modal',
    size: 'large',
    children: 'This is a larger modal with more content.',
  },
};
