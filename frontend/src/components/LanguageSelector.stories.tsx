import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { LanguageSelector } from './LanguageSelector';

const meta = {
  component: LanguageSelector,
} satisfies Meta<typeof LanguageSelector>;

export default meta;

type Story = StoryObj<typeof meta>;

function LanguageShell() {
  return (
    <div className="h-screen w-full bg-black text-white overflow-hidden">
      <div className="fixed top-4 right-4 z-50 flex flex-col items-end gap-2">
        <LanguageSelector />
      </div>
    </div>
  );
}

export const Default: Story = {
  render: () => <LanguageShell />,
};

export const Open: Story = {
  render: () => <LanguageShell />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole('button', { name: 'Language' }));

    await expect(canvas.getByRole('button', { name: /English/i })).toBeInTheDocument();
  },
};
