import type { Meta, StoryObj } from '@storybook/react-vite';
import { userEvent, within } from 'storybook/test';
import { LanguageSelector } from './LanguageSelector';

const meta = {
  component: LanguageSelector,
} satisfies Meta<typeof LanguageSelector>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="h-screen w-full bg-black text-white overflow-hidden">
      <div className="fixed top-4 right-4 z-50 flex flex-col items-end gap-2">
        <button className="text-sm text-white/70 transition-colors hover:text-white">
          About
        </button>
        <button className="text-sm text-white/70 transition-colors hover:text-white">
          Likes
        </button>
        <LanguageSelector />
      </div>
    </div>
  ),
};

export const Open: Story = {
  render: () => (
    <div className="h-screen w-full bg-black text-white overflow-hidden">
      <div className="fixed top-4 right-4 z-50 flex flex-col items-end gap-2">
        <button className="text-sm text-white/70 transition-colors hover:text-white">
          About
        </button>
        <button className="text-sm text-white/70 transition-colors hover:text-white">
          Likes
        </button>
        <LanguageSelector />
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Language' }));
    await canvas.findByRole('button', { name: /English/i });
  },
};
