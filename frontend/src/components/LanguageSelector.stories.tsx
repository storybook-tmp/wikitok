import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
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
    const button = canvas.getByRole('button', { name: /language/i });
    await expect(button).toBeVisible();
  },
};

export const DropdownOpen: Story = {
  render: () => (
    <div className="bg-black p-4 flex justify-end" style={{ minHeight: '300px' }}>
      <LanguageSelector />
    </div>
  ),
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: /language/i });
    await userEvent.click(button);
    const dropdown = canvas.getByRole('button', { name: /english/i });
    await expect(dropdown).toBeVisible();
  },
};

export const LanguageSelected: Story = {
  render: () => (
    <div className="bg-black p-4 flex justify-end" style={{ minHeight: '300px' }}>
      <LanguageSelector />
    </div>
  ),
  async beforeEach() {
    localStorage.setItem('lang', 'fr');
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: /language/i });
    await userEvent.click(button);
    // French should be listed in the dropdown
    const buttons = canvas.getAllByRole('button');
    const langNames = buttons.map((b) => b.textContent);
    await expect(langNames.some((name) => name?.includes('Français'))).toBe(true);
  },
};
