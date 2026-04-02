import type { Meta, StoryObj } from '@storybook/react-vite';
import { userEvent, within, expect } from 'storybook/test';
import { LanguageSelector } from './LanguageSelector';

const meta = {
  title: 'AI Generated/Complex/LanguageSelector',
  component: LanguageSelector,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: '#000000' }],
    },
  },
} satisfies Meta<typeof LanguageSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const DropdownOpen: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /language/i });
    await userEvent.click(button);
    await expect(canvas.getByRole('button', { name: /english/i })).toBeInTheDocument();
  },
};
