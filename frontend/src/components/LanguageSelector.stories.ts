import type { Meta, StoryObj } from '@storybook/react-vite';

import { createElement } from 'react';
import { expect, userEvent, within } from 'storybook/test';

import { LanguageSelector } from './LanguageSelector';

const meta = {
  title: 'AI Generated/Medium/LanguageSelector',
  component: LanguageSelector,
  parameters: {
    backgrounds: {
      default: 'dark',
    },
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) =>
      createElement(
        'div',
        { className: 'min-h-40 bg-black p-6 text-white' },
        createElement(Story),
      ),
  ],
  beforeEach: () => {
    localStorage.setItem('lang', 'en');
  },
} satisfies Meta<typeof LanguageSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const OpenMenu: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', { name: 'Language' });

    await userEvent.click(trigger);

    await expect(canvas.getByRole('button', { name: /English/i })).toBeVisible();
    await expect(canvas.getByRole('button', { name: /Français/i })).toBeVisible();
  },
};
