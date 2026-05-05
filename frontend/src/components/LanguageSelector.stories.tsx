import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';
import { LanguageSelector } from './LanguageSelector';

const meta = {
  component: LanguageSelector,
  tags: ['ai-generated'],
  decorators: [
    (Story) => (
      <div className="bg-black p-4 text-white">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof LanguageSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('button', { name: /language/i }),
    ).toBeVisible();
  },
};

export const OpenDropdown: Story = {
  play: async ({ canvas, userEvent }) => {
    const languageButton = canvas.getByRole('button', { name: /language/i });
    await userEvent.click(languageButton);
    await waitFor(() => {
      expect(canvas.getByText('English')).toBeVisible();
    });
    await expect(canvas.getByText('Deutsch')).toBeVisible();
    await expect(canvas.getByText('Français')).toBeVisible();
  },
};

export const CloseDropdown: Story = {
  play: async ({ canvas, userEvent }) => {
    const languageButton = canvas.getByRole('button', { name: /language/i });
    await userEvent.click(languageButton);
    await waitFor(() => {
      expect(canvas.getByText('English')).toBeVisible();
    });
    // Click again to close
    await userEvent.click(languageButton);
    await waitFor(() => {
      expect(canvas.queryByText('English')).toBeNull();
    });
  },
};
