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
    const button = canvas.getByRole('button', { name: /language/i });
    await expect(button).toBeVisible();
  },
};

export const DropdownOpen: Story = {
  play: async ({ canvas, userEvent }) => {
    const button = canvas.getByRole('button', { name: /language/i });
    await userEvent.click(button);
    await waitFor(() => {
      expect(canvas.getByText('English')).toBeVisible();
    });
    await expect(canvas.getByText('Deutsch')).toBeVisible();
    await expect(canvas.getByText('Français')).toBeVisible();
  },
};

export const DropdownClosed: Story = {
  play: async ({ canvas, userEvent }) => {
    const button = canvas.getByRole('button', { name: /language/i });
    await userEvent.click(button);
    await waitFor(() => {
      expect(canvas.getByText('English')).toBeVisible();
    });
    await userEvent.click(button);
    await waitFor(() => {
      expect(canvas.queryByText('English')).not.toBeInTheDocument();
    });
  },
};
