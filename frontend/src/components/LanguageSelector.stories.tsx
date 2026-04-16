import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';
import { LanguageSelector } from './LanguageSelector';

const meta = {
  component: LanguageSelector,
  render: () => (
    <div className="min-h-screen bg-black p-6 text-white">
      <LanguageSelector />
      <button className="mt-8 rounded border border-white/20 px-3 py-2">
        Outside target
      </button>
    </div>
  ),
} satisfies Meta<typeof LanguageSelector>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('button', { name: /language/i }),
    ).toBeVisible();
    await expect(localStorage.getItem('lang')).toBe('en');
  },
};

export const DropdownOpen: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: /language/i }));

    await expect(canvas.getByRole('button', { name: /english/i })).toBeVisible();
    await expect(canvas.getByRole('button', { name: /français/i })).toBeVisible();
  },
};

export const OutsideClickClosesDropdown: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: /language/i }));
    await expect(canvas.getByRole('button', { name: /english/i })).toBeVisible();

    await userEvent.click(canvas.getByRole('button', { name: /outside target/i }));

    await waitFor(() => {
      expect(
        canvas.queryByRole('button', { name: /english/i }),
      ).not.toBeInTheDocument();
    });
  },
};
