import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { LanguageSelector } from './LanguageSelector';

const meta = {
  component: LanguageSelector,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof LanguageSelector>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => renderLanguageSelectorStory(),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByRole('button', { name: /language/i })).toBeVisible();
    await expect(canvas.queryByText('English')).not.toBeInTheDocument();
  },
};

export const OpensMenu: Story = {
  render: () => renderLanguageSelectorStory(),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole('button', { name: /language/i }));
    await expect(canvas.getByText('English')).toBeVisible();
    await expect(canvas.getByText('Deutsch')).toBeVisible();
  },
};

export const ClosesOnOutsideClick: Story = {
  render: () => renderLanguageSelectorStory(),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole('button', { name: /language/i }));
    await expect(canvas.getByText('English')).toBeVisible();
    await userEvent.click(canvasElement);
    await expect(canvas.queryByText('English')).not.toBeInTheDocument();
  },
};

function renderLanguageSelectorStory() {
  return (
    <div className="min-h-screen w-full bg-black px-4 py-4 text-white">
      <div className="flex flex-col items-end gap-2">
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
