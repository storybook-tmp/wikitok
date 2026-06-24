import type { Meta, StoryObj } from '@storybook/react-vite';

import { expect, userEvent, within } from 'storybook/test';

import { LanguageSelector } from './LanguageSelector';

const meta = {
  title: 'AI Generated/Medium/LanguageSelector',
  component: LanguageSelector,
  parameters: {
    layout: 'centered',
    language: 'en',
  },
  decorators: [
    (Story) => (
      <div className="min-h-40 min-w-56 bg-black p-8 text-white">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof LanguageSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Closed: Story = {};

export const DropdownOpen: Story = {
  parameters: {
    language: 'ja',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Language' }));

    await expect(canvas.getByRole('img', { name: '日本語' })).toBeInTheDocument();
    await expect(canvas.getByText('English')).toBeInTheDocument();
  },
};
