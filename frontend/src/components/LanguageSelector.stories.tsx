import type { Meta, StoryObj } from '@storybook/react';
import { LanguageSelector } from './LanguageSelector';

const meta = {
  title: 'AI Generated/Simple/LanguageSelector',
  component: LanguageSelector,
} satisfies Meta<typeof LanguageSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Closed: Story = {
  render: () => <LanguageSelector />,
};
