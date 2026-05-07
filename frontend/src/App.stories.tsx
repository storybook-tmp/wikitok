import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';
import App from './App';

const meta = {
  component: App,
  tags: ['ai-generated'],
} satisfies Meta<typeof App>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WikipediaFeed: Story = {
  play: async ({ canvas }) => {
    await waitFor(
      async () => {
        await expect(
          canvas.getByRole('heading', { name: /ada lovelace/i })
        ).toBeVisible();
        await expect(canvas.getByText(/Analytical Engine/i)).toBeVisible();
      },
      { timeout: 5000 }
    );
  },
};
