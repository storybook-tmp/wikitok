import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { LanguageSelector } from './LanguageSelector';

const meta = {
  component: LanguageSelector,
  render: () => renderHeaderControls(),
} satisfies Meta<typeof LanguageSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const OpenDropdown: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole('button', { name: 'Language' }));

    await expect(canvas.getByText('English')).toBeVisible();
    await expect(canvas.getByText('日本語')).toBeVisible();
  },
};

function renderHeaderControls() {
  return (
    <div
      className="relative bg-black text-white overflow-hidden"
      style={{ minHeight: '100vh', width: '100vw' }}
    >
      <div className="absolute top-4 right-4 z-50 flex flex-col items-end gap-2">
        <button className="text-sm text-white/70 hover:text-white transition-colors">
          About
        </button>
        <button className="text-sm text-white/70 hover:text-white transition-colors">
          Likes
        </button>
        <LanguageSelector />
      </div>
    </div>
  );
}
