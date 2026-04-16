import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';
import { LanguageSelector } from './LanguageSelector';

const meta = {
  component: LanguageSelector,
} satisfies Meta<typeof LanguageSelector>;

export default meta;

type Story = StoryObj<typeof meta>;

function renderSelector() {
  return (
    <div className="min-h-screen p-6">
      <div className="fixed top-4 right-4 z-50 flex flex-col items-end gap-2">
        <LanguageSelector />
      </div>
    </div>
  );
}

export const Default: Story = {
  render: () => renderSelector(),
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('button', { name: /language/i }),
    ).toBeVisible();
  },
};

export const OpenDropdown: Story = {
  render: () => renderSelector(),
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: /language/i }));

    await expect(
      canvas.getByRole('button', { name: /english/i }),
    ).toBeVisible();
    await expect(
      canvas.getByRole('button', { name: /العربية/i }),
    ).toBeVisible();
  },
};

export const CloseOnOutsideClick: Story = {
  render: () => renderSelector(),
  play: async ({ canvas, canvasElement, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: /language/i }));

    await expect(
      canvas.getByRole('button', { name: /english/i }),
    ).toBeVisible();

    await userEvent.click(canvasElement.ownerDocument.body);

    await waitFor(() => {
      expect(
        canvas.queryByRole('button', { name: /english/i }),
      ).not.toBeInTheDocument();
    });
  },
};
