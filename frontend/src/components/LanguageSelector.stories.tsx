import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { LanguageSelector } from './LanguageSelector';

const meta = {
  component: LanguageSelector,
  tags: ['ai-generated'],
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '1rem', background: '#000' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof LanguageSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const OpenDropdown: Story = {
  play: async ({ canvas, userEvent }) => {
    const languageButton = canvas.getByRole('button', { name: /language/i });
    await userEvent.click(languageButton);
    // After clicking, the dropdown should show language options
    await expect(canvas.getByText('English')).toBeVisible();
    await expect(canvas.getByText('Deutsch')).toBeVisible();
  },
};
