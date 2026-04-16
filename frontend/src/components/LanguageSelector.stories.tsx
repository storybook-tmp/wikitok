import type { Meta, StoryObj } from '@storybook/react-vite';

import { expect, userEvent, within } from 'storybook/test';

import { LanguageSelector } from './LanguageSelector';

const meta = {
  title: 'AI Generated/Medium/LanguageSelector',
  component: LanguageSelector,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof LanguageSelector>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const OpenMenu: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Language' }));
    await expect(canvas.getByRole('button', { name: /English/i })).toBeInTheDocument();
  },
};
