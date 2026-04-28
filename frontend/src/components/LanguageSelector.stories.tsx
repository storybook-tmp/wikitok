import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';
import { LanguageSelector } from './LanguageSelector';

const meta = {
  component: LanguageSelector,
  tags: ['ai-generated'],
  decorators: [
    (Story) => (
      <div style={{ padding: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof LanguageSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Closed: Story = {
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: /language/i });
    await expect(button).toBeVisible();
  },
};

export const Opened: Story = {
  play: async ({ canvas, userEvent }) => {
    const button = canvas.getByRole('button', { name: /language/i });
    await userEvent.click(button);
    await waitFor(() => {
      expect(canvas.getByText('English')).toBeVisible();
    });
  },
};

export const ShowsMultipleLanguages: Story = {
  play: async ({ canvas, userEvent }) => {
    const button = canvas.getByRole('button', { name: /language/i });
    await userEvent.click(button);
    await waitFor(() => {
      expect(canvas.getByText('English')).toBeVisible();
    });
    await expect(canvas.getByText('Deutsch')).toBeVisible();
    await expect(canvas.getByText('Español')).toBeVisible();
  },
};
