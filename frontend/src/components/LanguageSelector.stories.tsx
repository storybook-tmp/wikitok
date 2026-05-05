import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';
import { LanguageSelector } from './LanguageSelector';

const meta = {
  component: LanguageSelector,
  tags: ['ai-generated'],
  decorators: [
    (Story) => (
      <div style={{ padding: '2rem', background: '#000', minHeight: '300px', display: 'flex', justifyContent: 'flex-end' }}>
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

export const Opened: Story = {
  play: async ({ canvas, userEvent }) => {
    const button = canvas.getByText('Language');
    await userEvent.click(button);
    await waitFor(() => {
      expect(canvas.getByText('English')).toBeVisible();
    });
    await expect(canvas.getByText('Français')).toBeVisible();
    await expect(canvas.getByText('Deutsch')).toBeVisible();
  },
};

export const SelectLanguage: Story = {
  play: async ({ canvas, userEvent }) => {
    const button = canvas.getByText('Language');
    await userEvent.click(button);
    await waitFor(() => {
      expect(canvas.getByText('English')).toBeVisible();
    });
  },
};
