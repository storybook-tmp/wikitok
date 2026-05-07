import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { LanguageSelector } from './LanguageSelector';

const meta = {
  component: LanguageSelector,
  parameters: {
    backgrounds: { default: 'dark' },
  },
  tags: ['ai-generated'],
} satisfies Meta<typeof LanguageSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Closed: Story = {};

export const Opened: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Language' }));
    await expect(canvas.getByRole('button', { name: /english/i })).toBeVisible();
  },
};

export const OutsideClickCloses: Story = {
  play: async ({ canvas, canvasElement, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Language' }));
    await expect(canvas.getByRole('button', { name: /english/i })).toBeVisible();

    await userEvent.click(canvasElement);
    await expect(canvas.queryByRole('button', { name: /english/i })).not.toBeInTheDocument();
  },
};
