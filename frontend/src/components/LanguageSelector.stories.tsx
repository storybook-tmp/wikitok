import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';
import { LanguageSelector } from './LanguageSelector';

const meta = {
  component: LanguageSelector,
} satisfies Meta<typeof LanguageSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <LanguageSelector />,
  play: async ({ canvas }) => {
    // Check that the Language button is visible
    const languageButton = canvas.getByRole('button', { name: /Language/i });
    await expect(languageButton).toBeVisible();
  },
};

export const DropdownOpen: Story = {
  render: () => <LanguageSelector />,
  play: async ({ canvas, userEvent }) => {
    // Click to open the dropdown
    const languageButton = canvas.getByRole('button', { name: /Language/i });
    await userEvent.click(languageButton);

    // Wait for the dropdown to be visible
    await waitFor(() => {
      const englishOption = canvas.getByRole('button', { name: /English/i });
      expect(englishOption).toBeVisible();
    });

    // Check that various language options are visible
    const spanishOption = canvas.getByRole('button', { name: /Español/i });
    await expect(spanishOption).toBeVisible();
  },
};

export const LanguageSelected: Story = {
  beforeEach() {
    localStorage.setItem('lang', 'fr');
  },
  render: () => <LanguageSelector />,
  play: async ({ canvas }) => {
    // Button should still be visible
    const languageButton = canvas.getByRole('button', { name: /Language/i });
    await expect(languageButton).toBeVisible();
  },
};
