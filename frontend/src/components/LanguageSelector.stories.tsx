import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { LanguageSelector } from './LanguageSelector';

const meta = {
  component: LanguageSelector,
  tags: ['ai-generated'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof LanguageSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: /language/i });
    await expect(button).toBeVisible();
  },
};

export const OpenDropdown: Story = {
  play: async ({ canvas, userEvent }) => {
    const button = canvas.getByRole('button', { name: /language/i });
    await userEvent.click(button);
    await expect(canvas.getByText('English')).toBeVisible();
    await expect(canvas.getByText('Deutsch')).toBeVisible();
    await expect(canvas.getByText('Français')).toBeVisible();
  },
};

export const SelectLanguage: Story = {
  play: async ({ canvas, userEvent }) => {
    const button = canvas.getByRole('button', { name: /language/i });
    await userEvent.click(button);
    const englishOption = canvas.getByText('English');
    await expect(englishOption).toBeVisible();
  },
};
