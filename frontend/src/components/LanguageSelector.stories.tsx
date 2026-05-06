import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { LanguageSelector } from './LanguageSelector';

const meta = {
  component: LanguageSelector,
  tags: ['ai-generated'],
  parameters: {
    backgrounds: { default: 'dark' },
  },
  decorators: [
    (Story) => (
      <div className="bg-black p-4 flex justify-end">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof LanguageSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Closed: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /language/i })).toBeVisible();
  },
};

export const Opened: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: /language/i }));
    // Verify dropdown opened with language options
    await expect(canvas.getByText('English')).toBeVisible();
    await expect(canvas.getByText('Français')).toBeVisible();
    await expect(canvas.getByText('Deutsch')).toBeVisible();
  },
};
