import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent } from 'storybook/test';
import { LanguageSelector } from './LanguageSelector';

const meta = {
  component: LanguageSelector,
} satisfies Meta<typeof LanguageSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="bg-black p-4 flex justify-end">
      <LanguageSelector />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('button', { name: /language/i })).toBeVisible();
  },
};

export const DropdownOpen: Story = {
  render: () => (
    <div className="bg-black p-4 flex justify-end" style={{ minHeight: '300px' }}>
      <LanguageSelector />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const languageButton = canvas.getByRole('button', { name: /language/i });
    await userEvent.click(languageButton);
    const englishOption = canvas.getByRole('button', { name: /english/i });
    await expect(englishOption).toBeVisible();
  },
};

export const LanguageSearch: Story = {
  render: () => (
    <div className="bg-black p-4 flex justify-end" style={{ minHeight: '300px' }}>
      <LanguageSelector />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const languageButton = canvas.getByRole('button', { name: /language/i });
    await userEvent.click(languageButton);
    const deutschOption = canvas.getByRole('button', { name: /deutsch/i });
    await expect(deutschOption).toBeVisible();
    const japaneseOption = canvas.getByRole('button', { name: /日本語/i });
    await expect(japaneseOption).toBeVisible();
  },
};
