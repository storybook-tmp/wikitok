import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { LanguageSelector } from './LanguageSelector';

const meta = {
  component: LanguageSelector,
  tags: ['ai-generated'],
} satisfies Meta<typeof LanguageSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    const languageButton = canvas.getByRole('button', { name: /language/i });
    await userEvent.click(languageButton);
    await expect(canvas.getByText('English')).toBeVisible();
    await expect(canvas.getByText('Français')).toBeVisible();
  },
};

export const Closed: Story = {};
