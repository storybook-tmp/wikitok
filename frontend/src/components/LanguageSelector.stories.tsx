import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';
import { LanguageSelector } from './LanguageSelector';

const meta = {
  component: LanguageSelector,
  tags: ['ai-generated'],
  decorators: [
    (Story) => (
      <div style={{ background: '#000', padding: '1rem' }}>
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
    const button = canvas.getByText('Language');
    await userEvent.click(button);

    await waitFor(() => {
      expect(canvas.getByText('English')).toBeVisible();
    });
    await expect(canvas.getByText('Deutsch')).toBeVisible();
  },
};

export const LanguageSelection: Story = {
  play: async ({ canvas, userEvent }) => {
    const button = canvas.getByText('Language');
    await userEvent.click(button);

    await waitFor(() => {
      expect(canvas.getByText('English')).toBeVisible();
    });

    // Verify multiple language options are present
    await expect(canvas.getByText('Deutsch')).toBeVisible();
    await expect(canvas.getByText('Italiano')).toBeVisible();
  },
};
