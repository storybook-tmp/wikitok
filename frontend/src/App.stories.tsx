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
    await expect(canvas.getByText('WikiTok')).toBeVisible();
    await expect(canvas.getByText('About')).toBeVisible();
    await expect(canvas.getByText('Likes')).toBeVisible();

    // Wait for articles to load from MSW mock
    await waitFor(
      () => {
        expect(canvas.getByText('Solar System')).toBeVisible();
      },
      { timeout: 5000 }
    );
  },
};

export const AboutModal: Story = {
  play: async ({ canvas, userEvent }) => {
    const aboutButton = canvas.getByText('About');
    await userEvent.click(aboutButton);

    await waitFor(() => {
      expect(
        canvas.getByRole('heading', { name: /about wikitok/i })
      ).toBeVisible();
    });

    await expect(
      canvas.getByText(/tiktok-style interface/i)
    ).toBeVisible();
  },
};

export const LikesModal: Story = {
  play: async ({ canvas, userEvent }) => {
    const likesButton = canvas.getByText('Likes');
    await userEvent.click(likesButton);

    await waitFor(() => {
      expect(
        canvas.getByRole('heading', { name: /liked articles/i })
      ).toBeVisible();
    });

    await expect(canvas.getByText(/no liked articles yet/i)).toBeVisible();
  },
};
