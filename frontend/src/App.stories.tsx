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
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('button', { name: /wikitok/i })
    ).toBeVisible();
    await waitFor(() => {
      expect(canvas.getByText('Aurora Borealis')).toBeVisible();
    });
  },
};

export const AboutModal: Story = {
  play: async ({ canvas, userEvent }) => {
    await waitFor(() => {
      expect(canvas.getByRole('button', { name: /about/i })).toBeVisible();
    });
    await userEvent.click(canvas.getByRole('button', { name: /about/i }));
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
    await waitFor(() => {
      expect(canvas.getByRole('button', { name: /likes/i })).toBeVisible();
    });
    await userEvent.click(canvas.getByRole('button', { name: /likes/i }));
    await waitFor(() => {
      expect(
        canvas.getByRole('heading', { name: /liked articles/i })
      ).toBeVisible();
    });
    await expect(canvas.getByText(/no liked articles yet/i)).toBeVisible();
  },
};
