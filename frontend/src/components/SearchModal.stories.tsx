import type { Meta, StoryObj } from '@storybook/react';
import SearchModal from './SearchModal';

const meta = {
  title: 'AI Generated/Complex/SearchModal',
  component: SearchModal,
} satisfies Meta<typeof SearchModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {
  args: {
    isOpen: true,
    onClose: () => alert('Modal closed'),
    onSearch: (query) => alert(`Searching for: ${query}`),
    placeholder: 'Search articles...',
    title: 'Search Articles',
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
    onClose: () => alert('Modal closed'),
  },
};

export const CustomTitle: Story = {
  args: {
    isOpen: true,
    onClose: () => alert('Modal closed'),
    onSearch: (query) => alert(`Searching for: ${query}`),
    placeholder: 'Find what you need...',
    title: 'Advanced Search',
  },
};
