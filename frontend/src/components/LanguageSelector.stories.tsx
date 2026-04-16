import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { LanguageSelector } from './LanguageSelector';

const meta = {
  component: LanguageSelector,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof LanguageSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Closed: Story = {
  render: () => <ToolbarShell />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByRole('button', { name: /language/i })).toBeVisible();
    await expect(canvas.queryByText('English')).not.toBeInTheDocument();
  },
};

export const OpensDropdown: Story = {
  render: () => <ToolbarShell />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole('button', { name: /language/i }));

    await expect(canvas.getByText('English')).toBeVisible();
    await expect(canvas.getByText('Français')).toBeVisible();
  },
};

export const ClosesOnOutsideClick: Story = {
  render: () => <ToolbarShell />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const shell = canvas.getByTestId('language-shell');

    await userEvent.click(canvas.getByRole('button', { name: /language/i }));
    await expect(canvas.getByText('English')).toBeVisible();

    await userEvent.click(shell);

    await waitFor(() => {
      expect(canvas.queryByText('English')).not.toBeInTheDocument();
    });
  },
};

function ToolbarShell() {
  return (
    <div
      className="relative h-80 bg-black text-white"
      data-testid="language-shell"
    >
      <div className="absolute top-4 right-4 z-50 flex flex-col items-end gap-2">
        <button className="text-sm text-white/70">About</button>
        <button className="text-sm text-white/70">Likes</button>
        <LanguageSelector />
      </div>
    </div>
  );
}
