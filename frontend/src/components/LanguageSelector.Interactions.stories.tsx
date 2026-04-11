import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';
import { LanguageSelector } from './LanguageSelector';

const meta = {
  component: LanguageSelector,
} satisfies Meta<typeof LanguageSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DropdownToggle: Story = {
  render: () => <LanguageSelector />,
  play: async ({ canvas, userEvent }) => {
    // Get the button
    const languageButton = canvas.getByRole('button', { name: /Language/i });
    await expect(languageButton).toBeVisible();

    // Click to open
    await userEvent.click(languageButton);

    // Verify dropdown is visible
    await waitFor(() => {
      const englishOption = canvas.getByRole('button', { name: /English/i });
      expect(englishOption).toBeVisible();
    });

    // Click to close
    await userEvent.click(languageButton);

    // The dropdown should no longer be visible
    await expect(canvas.queryByRole('button', { name: /English/i })).not.toBeInTheDocument();
  },
};

export const ScrollableLanguages: Story = {
  render: () => <LanguageSelector />,
  play: async ({ canvas, userEvent }) => {
    // Open dropdown
    const languageButton = canvas.getByRole('button', { name: /Language/i });
    await userEvent.click(languageButton);

    // Wait for dropdown to appear
    await waitFor(() => {
      const englishOption = canvas.getByRole('button', { name: /English/i });
      expect(englishOption).toBeVisible();
    });

    // Check that multiple languages are visible
    const spanishOption = canvas.getByRole('button', { name: /Español/i });
    await expect(spanishOption).toBeVisible();

    const frenchOption = canvas.getByRole('button', { name: /Français/i });
    await expect(frenchOption).toBeVisible();

    const germanOption = canvas.getByRole('button', { name: /Deutsch/i });
    await expect(germanOption).toBeVisible();
  },
};

export const LanguageFlags: Story = {
  render: () => <LanguageSelector />,
  play: async ({ canvas, userEvent }) => {
    // Open dropdown
    const languageButton = canvas.getByRole('button', { name: /Language/i });
    await userEvent.click(languageButton);

    // Wait for dropdown
    await waitFor(() => {
      const englishOption = canvas.getByRole('button', { name: /English/i });
      expect(englishOption).toBeVisible();
    });

    // Check that flag images are rendered
    const images = canvas.getAllByRole('img');
    await expect(images.length).toBeGreaterThan(0);

    // Check that at least one image has an alt text
    const flagImages = images.filter(img => img.alt && img.alt.length > 0);
    await expect(flagImages.length).toBeGreaterThan(0);
  },
};
