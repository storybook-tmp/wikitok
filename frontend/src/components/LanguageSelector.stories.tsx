import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { LanguageSelector } from './LanguageSelector';

const meta = {
  component: LanguageSelector,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof LanguageSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Closed: Story = {
  render: () => (
    <div className="min-h-32 w-64 bg-black p-4 text-right text-white">
      <LanguageSelector />
    </div>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /language/i })).toBeVisible();
    expect(localStorage.getItem('lang')).toBe('en');
  },
};

export const OpenMenu: Story = {
  render: () => (
    <div className="min-h-80 w-64 bg-black p-4 text-right text-white">
      <LanguageSelector />
    </div>
  ),
  play: async ({ canvas, userEvent }) => {
    const languageButton = canvas.getByRole('button', { name: /language/i });

    await userEvent.click(languageButton);

    await expect(canvas.getByRole('button', { name: /english/i })).toBeVisible();
    await expect(canvas.getByRole('button', { name: /deutsch/i })).toBeVisible();

    await userEvent.click(languageButton.ownerDocument.body);

    await expect(canvas.queryByRole('button', { name: /english/i })).not.toBeInTheDocument();
  },
};
