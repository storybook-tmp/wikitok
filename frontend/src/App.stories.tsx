import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';
import App from './App';

const meta = {
  component: App,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['ai-generated'],
} satisfies Meta<typeof App>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoadedFeed: Story = {
  play: async ({ canvas }) => {
    await expect(await canvas.findByRole('heading', { name: 'Storybook' })).toBeVisible();
    await expect(canvas.getAllByRole('link', { name: /read more/i })[0]).toHaveAttribute(
      'href',
      'https://en.wikipedia.org/wiki/Storybook'
    );
  },
};

export const LikesPanel: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(await canvas.findByRole('button', { name: 'Likes' }));
    await expect(canvas.getByText('No liked articles yet.')).toBeVisible();
  },
};

export const AboutPanel: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(await canvas.findByRole('button', { name: 'About' }));
    await expect(canvas.getByRole('heading', { name: 'About WikiTok' })).toBeVisible();
  },
};

export const CssCheck: Story = {
  play: async ({ canvasElement }) => {
    await waitFor(() => {
      const shell = canvasElement.querySelector('.hide-scroll');

      expect(shell).not.toBeNull();
      expect(getComputedStyle(shell as Element).scrollbarWidth).toBe('none');
    });
  },
};
