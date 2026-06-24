import type { Meta, StoryObj } from '@storybook/react-vite';
import { LanguageSelector } from './LanguageSelector';

const meta = {
  title: 'AI Generated/Complex/LanguageSelector',
  component: LanguageSelector,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof LanguageSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Opened: Story = {
  play: async ({ canvasElement }) => {
    const { userEvent, within } = await import('storybook/test');
    const canvas = within(canvasElement);
    const button = canvas.getByText('Language');
    await userEvent.click(button);
  },
};
