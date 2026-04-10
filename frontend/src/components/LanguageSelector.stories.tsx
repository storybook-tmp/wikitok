import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { LanguageSelector } from './LanguageSelector';

const meta = {
  component: LanguageSelector,
} satisfies Meta<typeof LanguageSelector>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => renderLanguageSelectorInShell(),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByRole('button', { name: /language/i })).toBeVisible();
    await expect(canvas.getByRole('button', { name: /about/i })).toBeVisible();
  },
};

export const OpenMenu: Story = {
  render: () => renderLanguageSelectorInShell(),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    await user.click(canvas.getByRole('button', { name: /language/i }));
    await waitFor(() => expect(canvas.getByRole('button', { name: /english/i })).toBeVisible());
    await expect(canvas.getByRole('button', { name: /deutsch/i })).toBeVisible();
    await expect(canvas.getByRole('button', { name: /français/i })).toBeVisible();
  },
};

export const CloseOnOutsidePress: Story = {
  render: () => renderLanguageSelectorInShell(),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    await user.click(canvas.getByRole('button', { name: /language/i }));
    await waitFor(() => expect(canvas.getByRole('button', { name: /english/i })).toBeVisible());
    await user.click(canvasElement.ownerDocument.body);
    await waitFor(() =>
      expect(canvas.queryByRole('button', { name: /english/i })).not.toBeInTheDocument(),
    );
  },
};

function renderLanguageSelectorInShell() {
  return (
    <div className="h-screen w-full bg-black text-white overflow-hidden">
      <div className="fixed top-4 right-4 z-50 flex flex-col items-end gap-2">
        <button className="text-sm text-white/70">About</button>
        <button className="text-sm text-white/70">Likes</button>
        <LanguageSelector />
      </div>
    </div>
  );
}
