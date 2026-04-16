import type { Meta, StoryObj } from '@storybook/react-vite';
import { LanguageSelector } from './LanguageSelector';

const meta = {
  title: 'AI Generated/Simple/LanguageSelector',
  component: LanguageSelector,
  decorators: [
    (Story) => (
      <div className="bg-black p-8 flex justify-end">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof LanguageSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const InHeader: Story = {
  decorators: [
    (Story) => (
      <div className="bg-black p-4 flex justify-end items-center gap-4">
        <span className="text-sm text-white/70">About</span>
        <span className="text-sm text-white/70">Likes</span>
        <Story />
      </div>
    ),
  ],
};
