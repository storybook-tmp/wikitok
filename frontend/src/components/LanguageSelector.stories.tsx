import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';

import { LanguageSelector } from './LanguageSelector';

const meta = {
  component: LanguageSelector,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['ai-generated'],
} satisfies Meta<typeof LanguageSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Closed: Story = {
  render: () => (
    <div className="min-h-48 bg-black p-6 text-white">
      <LanguageSelector />
    </div>
  ),
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('button', { name: /Language/i }),
    ).toBeVisible();
    await expect(canvas.queryByText('English')).not.toBeInTheDocument();
  },
};

export const OpenMenu: Story = {
  render: () => (
    <div className="min-h-48 bg-black p-6 text-white">
      <LanguageSelector />
    </div>
  ),
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: /Language/i }));

    await expect(canvas.getByText('English')).toBeVisible();
    await expect(canvas.getByText('Deutsch')).toBeVisible();
  },
};

export const CloseOnOutsideClick: Story = {
  render: () => (
    <div className="min-h-56 bg-black p-6 text-white">
      <button type="button" className="mb-4 block text-white">
        Outside target
      </button>
      <LanguageSelector />
    </div>
  ),
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: /Language/i }));
    await expect(canvas.getByText('English')).toBeVisible();

    await userEvent.click(
      canvas.getByRole('button', { name: /Outside target/i }),
    );
    await waitFor(() =>
      expect(canvas.queryByText('English')).not.toBeInTheDocument(),
    );
  },
};

