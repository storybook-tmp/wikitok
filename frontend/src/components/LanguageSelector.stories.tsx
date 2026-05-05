import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';
import { LanguageSelector } from './LanguageSelector';

const meta = {
  component: LanguageSelector,
  tags: ['ai-generated'],
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '1rem' }}>
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
  },
};

export const ShowsMultipleLanguages: Story = {
  play: async ({ canvas, userEvent }) => {
    const button = canvas.getByText('Language');
    await userEvent.click(button);
    await waitFor(() => {
      expect(canvas.getByText('English')).toBeVisible();
      expect(canvas.getByText('Deutsch')).toBeVisible();
      expect(canvas.getByText('Italiano')).toBeVisible();
    });
  },
};
