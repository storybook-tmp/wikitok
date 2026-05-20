import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from './Card';

const meta = {
  title: 'AI Generated/Simple/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Card Title',
    children: 'This is a default card with a clean border.',
    variant: 'default',
  },
};

export const Elevated: Story = {
  args: {
    title: 'Elevated Card',
    children: 'This card has an elevated shadow effect.',
    variant: 'elevated',
  },
};

export const Outlined: Story = {
  args: {
    title: 'Outlined Card',
    children: 'This card has an outlined border style.',
    variant: 'outlined',
  },
};
