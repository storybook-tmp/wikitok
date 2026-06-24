import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
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
        <LanguageSelector />
      </div>
    </div>
  ),
};

export const MenuOpen: Story = {
  render: () => (
    <div className="h-screen w-full bg-black text-white overflow-hidden">
      <div className="fixed top-4 right-4 z-50 flex flex-col items-end gap-2">
        <LanguageSelector />
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(await canvas.findByRole('button', { name: 'Language' }));
    await expect(canvas.findByRole('button', { name: /English/i })).resolves.toBeVisible();
  },
};
