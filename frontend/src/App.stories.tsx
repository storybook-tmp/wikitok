import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';
import App from './App';

const meta = {
  component: App,
  tags: ['ai-generated'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof App>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await waitFor(
      () => {
        expect(canvas.getByText('WikiTok')).toBeVisible();
      },
      { timeout: 5000 },
    );
    await expect(
      canvas.getByRole('button', { name: /about/i }),
    ).toBeVisible();
    await expect(
      canvas.getByRole('button', { name: /likes/i }),
    ).toBeVisible();
  },
};

export const LoadingState: Story = {
  play: async ({ canvas }) => {
    // The app initiates a fetch on mount and shows loading state
    await expect(canvas.getByText('WikiTok')).toBeVisible();
    await waitFor(
      () => {
        expect(canvas.getByText(/loading/i)).toBeVisible();
      },
      { timeout: 5000 },
    );
  },
};

export const AboutModal: Story = {
  play: async ({ canvas, userEvent }) => {
    await waitFor(
      () => {
        expect(canvas.getByText('WikiTok')).toBeVisible();
      },
      { timeout: 5000 },
    );
    const aboutButton = canvas.getByRole('button', { name: /about/i });
    await userEvent.click(aboutButton);
    await waitFor(() => {
      expect(
        canvas.getByRole('heading', { name: /about wikitok/i }),
      ).toBeVisible();
    });
    await expect(
      canvas.getByText(/tiktok-style interface/i),
    ).toBeVisible();
  },
};
