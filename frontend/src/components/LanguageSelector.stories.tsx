import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { LanguageSelector } from './LanguageSelector';

const meta = {
  component: LanguageSelector,
  render: renderLanguageSelectorInShell,
} satisfies Meta<typeof LanguageSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Open: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(await canvas.findByRole('button', { name: 'Language' }));

    await expect(canvas.getByRole('button', { name: /English/ })).toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: /日本語/ })).toBeInTheDocument();
  },
};

function renderLanguageSelectorInShell() {
  return (
    <div className="w-full bg-black p-4 text-white" style={{ minHeight: '100svh' }}>
      <div className="flex justify-end">
        <div className="flex flex-col items-end gap-2">
        <button className="text-sm text-white/70 hover:text-white transition-colors">About</button>
        <button className="text-sm text-white/70 hover:text-white transition-colors">Likes</button>
        <LanguageSelector />
        </div>
      </div>
    </div>
  );
}
