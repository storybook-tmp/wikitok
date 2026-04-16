import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { LanguageSelector } from './LanguageSelector';

const meta = {
  title: 'AI Generated/Medium/LanguageSelector',
  component: LanguageSelector,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ background: '#000', padding: '40px', minWidth: '200px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof LanguageSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithDarkBackground: Story = {
  decorators: [
    (Story) => (
      <div style={{ background: '#111827', padding: '60px', minWidth: '300px' }}>
        <Story />
      </div>
    ),
  ],
};
