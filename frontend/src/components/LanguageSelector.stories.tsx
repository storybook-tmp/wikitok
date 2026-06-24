import type { Meta, StoryObj } from '@storybook/react-vite';

import { expect, userEvent, within } from 'storybook/test';

import { LanguageSelector } from './LanguageSelector';

const meta = {
  title: 'AI Generated/Medium/LanguageSelector',
  component: LanguageSelector,
  parameters: {
    layout: 'centered',
  },
  render: () => (
    <div className="min-h-48 min-w-64 bg-black p-6 text-white">
      <LanguageSelector />
    </div>
  ),
} satisfies Meta<typeof LanguageSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Closed: Story = {};

export const OpenDropdown: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', { name: 'Language' });

    await userEvent.click(trigger);

    await expect(canvas.getByRole('button', { name: /English/ })).toBeInTheDocument();
  },
};
