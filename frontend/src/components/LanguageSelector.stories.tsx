import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { LanguageSelector } from './LanguageSelector';

const meta = {
  component: LanguageSelector,
} satisfies Meta<typeof LanguageSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="bg-black p-4 flex justify-end">
      <LanguageSelector />
    </div>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /language/i })).toBeVisible();
  },
};

export const DropdownOpen: Story = {
  render: () => (
    <div className="bg-black p-4 flex justify-end" style={{ minHeight: '300px' }}>
      <LanguageSelector />
    </div>
  ),
  play: async ({ canvas, userEvent }) => {
    const button = canvas.getByRole('button', { name: /language/i });
    await userEvent.click(button);
    await expect(canvas.getByRole('button', { name: /english/i })).toBeVisible();
    await expect(canvas.getByRole('button', { name: /deutsch/i })).toBeVisible();
    await expect(canvas.getByRole('button', { name: /français/i })).toBeVisible();
  },
};

export const DropdownClosed: Story = {
  render: () => (
    <div className="bg-black p-4 flex justify-end">
      <LanguageSelector />
    </div>
  ),
  play: async ({ canvas, userEvent }) => {
    const button = canvas.getByRole('button', { name: /language/i });
    await userEvent.click(button);
    await expect(canvas.getByRole('button', { name: /english/i })).toBeVisible();
    await userEvent.click(button);
    await expect(canvas.queryByRole('button', { name: /english/i })).toBeNull();
  },
};
