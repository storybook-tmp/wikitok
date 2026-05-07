import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import { LanguageSelector } from './LanguageSelector';

const meta = {
  component: LanguageSelector,
  render: () => (
    <div className="min-h-40 bg-black p-6 text-white">
      <LanguageSelector />
    </div>
  ),
  tags: ['ai-generated'],
} satisfies Meta<typeof LanguageSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Closed: Story = {
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('button', { name: /language/i }),
    ).toBeVisible();
    await expect(localStorage.getItem('lang')).toBe('en');
  },
};

export const Open: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: /language/i }));

    await expect(
      canvas.getByRole('button', { name: /english/i }),
    ).toBeVisible();
  },
};

