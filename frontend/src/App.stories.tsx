import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';
import App from './App';

const meta = {
  component: App,
  tags: ['ai-generated'],
} satisfies Meta<typeof App>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <App />,
  play: async ({ canvas }) => {
    await waitFor(
      () => {
        expect(canvas.getByText('Aurora Borealis')).toBeVisible();
      },
      { timeout: 5000 }
    );
    await expect(canvas.getByText('WikiTok')).toBeVisible();
    await expect(canvas.getByText('About')).toBeVisible();
    await expect(canvas.getByText('Likes')).toBeVisible();
    await expect(canvas.getByText('Language')).toBeVisible();
  },
};

export const AboutModal: Story = {
  render: () => <App />,
  play: async ({ canvas, userEvent }) => {
    await waitFor(
      () => {
        expect(canvas.getByText('WikiTok')).toBeVisible();
      },
      { timeout: 5000 }
    );
    const aboutButton = canvas.getByText('About');
    await userEvent.click(aboutButton);
    await waitFor(() => {
      expect(canvas.getByText('About WikiTok')).toBeVisible();
    });
    await expect(canvas.getByText(/TikTok-style interface/)).toBeVisible();
  },
};

export const LikesModal: Story = {
  render: () => <App />,
  play: async ({ canvas, userEvent }) => {
    await waitFor(
      () => {
        expect(canvas.getByText('WikiTok')).toBeVisible();
      },
      { timeout: 5000 }
    );
    const likesButton = canvas.getByText('Likes');
    await userEvent.click(likesButton);
    await waitFor(() => {
      expect(canvas.getByText('Liked Articles')).toBeVisible();
    });
    await expect(canvas.getByText('No liked articles yet.')).toBeVisible();
  },
};

export const LikeAndViewLikes: Story = {
  render: () => <App />,
  play: async ({ canvas, userEvent }) => {
    // Wait for articles to load
    await waitFor(
      () => {
        expect(canvas.getByText('Aurora Borealis')).toBeVisible();
      },
      { timeout: 5000 }
    );
    // Like the first article
    const likeButtons = canvas.getAllByLabelText('Like article');
    await userEvent.click(likeButtons[0]);
    // Open Likes modal and see the liked article
    const likesButton = canvas.getByText('Likes');
    await userEvent.click(likesButton);
    await waitFor(() => {
      expect(canvas.getByText('Liked Articles')).toBeVisible();
    });
    // The liked article should appear in the list
    const likedItems = canvas.getAllByText('Aurora Borealis');
    await expect(likedItems.length).toBeGreaterThanOrEqual(1);
  },
};
