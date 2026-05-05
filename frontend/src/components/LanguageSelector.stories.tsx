import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';
import { LanguageSelector } from './LanguageSelector';

const meta = {
  component: LanguageSelector,
  tags: ['ai-generated'],
  decorators: [
    (Story) => (
      <div style={{ padding: '1rem', background: '#000', minHeight: '300px' }}>
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

export const OpenDropdown: Story = {
  play: async ({ canvas, userEvent }) => {
    const languageButton = canvas.getByText('Language');
    await userEvent.click(languageButton);
    await waitFor(() => {
      expect(canvas.getByText('English')).toBeVisible();
    });
    await expect(canvas.getByText('Deutsch')).toBeVisible();
    await expect(canvas.getByText('Italiano')).toBeVisible();
  },
};

export const SelectLanguage: Story = {
  play: async ({ canvas, userEvent }) => {
    const languageButton = canvas.getByText('Language');
    await userEvent.click(languageButton);
    await waitFor(() => {
      expect(canvas.getByText('English')).toBeVisible();
    });
    // Verify multiple language options are rendered
    const buttons = canvas.getAllByRole('button');
    // Language button + individual language buttons
    await expect(buttons.length).toBeGreaterThan(1);
  },
};
