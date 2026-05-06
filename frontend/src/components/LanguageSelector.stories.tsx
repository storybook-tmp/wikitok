import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';
import { LanguageSelector } from './LanguageSelector';

const meta = {
  component: LanguageSelector,
  tags: ['ai-generated'],
  decorators: [
    (Story) => (
      <div className="bg-black p-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof LanguageSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Language')).toBeVisible();
  },
};

export const DropdownOpen: Story = {
  play: async ({ canvas, userEvent }) => {
    const button = canvas.getByText('Language');
    await userEvent.click(button);
    await waitFor(() => {
      expect(canvas.getByText('English')).toBeVisible();
    });
    await expect(canvas.getByText('Deutsch')).toBeVisible();
    await expect(canvas.getByText('Français')).toBeVisible();
  },
};

export const SelectLanguage: Story = {
  play: async ({ canvas, userEvent }) => {
    const button = canvas.getByText('Language');
    await userEvent.click(button);
    await waitFor(() => {
      expect(canvas.getByText('Deutsch')).toBeVisible();
    });
  },
};
