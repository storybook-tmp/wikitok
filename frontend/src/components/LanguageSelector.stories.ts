import type { Meta, StoryObj } from '@storybook/react-vite';
import { LanguageSelector } from './LanguageSelector';

const meta = {
  title: 'AI Generated/Medium/LanguageSelector',
  component: LanguageSelector,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof LanguageSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Padded: Story = {
  parameters: { layout: 'padded' },
};
