import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { LanguageSelector } from './LanguageSelector';

const meta = {
  title: 'AI Generated/Medium/LanguageSelector',
  component: LanguageSelector,
  decorators: [
    (Story) => (
      <div className="flex justify-end bg-gray-900 p-4 min-h-64">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof LanguageSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const InNavbar: Story = {
  decorators: [
    (Story) => (
      <div className="flex items-center justify-between bg-black p-4">
        <span className="text-white text-2xl font-bold">WikiTok</span>
        <div className="flex gap-4">
          <button className="text-sm text-white/70">About</button>
          <button className="text-sm text-white/70">Likes</button>
          <Story />
        </div>
      </div>
    ),
  ],
};
