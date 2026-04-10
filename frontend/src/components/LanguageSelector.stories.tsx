import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { LanguageSelector } from './LanguageSelector';

const meta = {
  component: LanguageSelector,
  render: () => <LanguageSelectorFrame />,
} satisfies Meta<typeof LanguageSelector>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /language/i })).toBeVisible();
  },
};

export const OpensMenu: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: /language/i }));

    await expect(canvas.getByRole('button', { name: /english/i })).toBeVisible();
    await expect(canvas.getByRole('button', { name: /tiếng việt/i })).toBeVisible();
  },
};

export const ClosesOnOutsideClick: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: /language/i }));
    await expect(canvas.getByRole('button', { name: /english/i })).toBeVisible();

    await userEvent.click(canvas.getByRole('button', { name: /outside area/i }));

    await expect(canvas.queryByRole('button', { name: /english/i })).not.toBeInTheDocument();
  },
};

function LanguageSelectorFrame() {
  return (
    <div className="flex min-h-screen justify-end bg-black p-4 text-white">
      <div className="flex w-full max-w-md flex-col items-end gap-4">
        <LanguageSelector />
        <button type="button" className="text-sm text-white/70">
          Outside area
        </button>
      </div>
    </div>
  );
}
