import type { Meta, StoryObj } from '@storybook/react-vite';

import { expect, userEvent, within } from 'storybook/test';

import App from './App';

const meta = {
  title: 'AI Generated/Complex/App',
  component: App,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof App>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FeedLoaded: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const articleLink = await canvas.findByRole('link', { name: /aurora lake/i });
    await expect(articleLink).toBeInTheDocument();
  },
};

export const LikesPanel: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const articleLink = await canvas.findByRole('link', { name: /aurora lake/i });
    await expect(articleLink).toBeInTheDocument();

    const likeButtons = canvas.getAllByRole('button', { name: /like article/i });
    await userEvent.click(likeButtons[0]);
    await userEvent.click(canvas.getByRole('button', { name: /likes/i }));

    const likedHeading = await canvas.findByRole('heading', { name: /liked articles/i });
    await expect(likedHeading).toBeInTheDocument();

    const removeButtons = await canvas.findAllByRole('button', {
      name: /remove from likes/i,
    });
    await expect(removeButtons.length).toBeGreaterThan(0);
  },
};
