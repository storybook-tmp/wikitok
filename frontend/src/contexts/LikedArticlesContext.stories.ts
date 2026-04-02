import type { Meta, StoryObj } from '@storybook/react';
import { LikedArticlesProvider } from './LikedArticlesContext';

const meta = {
  title: 'AI Generated/Complex/LikedArticlesProvider',
  component: LikedArticlesProvider,
} satisfies Meta<typeof LikedArticlesProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Content wrapped by the LikedArticlesProvider context.',
  },
};

export const WithMultipleChildren: Story = {
  args: {
    children: 'This provider manages liked articles state and persists to localStorage.',
  },
};
