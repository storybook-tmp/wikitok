import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';

import { LanguageSelector } from './LanguageSelector';

const meta = {
  title: 'AI Generated/Complex/LanguageSelector',
  component: LanguageSelector,
  decorators: [
    (Story) => (
      <div className="flex min-h-[320px] items-start justify-end bg-black p-6 text-white">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof LanguageSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Closed: Story = {};

export const OpenMenu: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Language' }));
    await expect(canvas.getByRole('button', { name: /English/ })).toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: /Deutsch/ })).toBeInTheDocument();
  },
};
