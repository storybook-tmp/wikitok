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

export const AboutModal: Story = {
  play: async ({ canvas, userEvent }) => {
    await waitFor(
      () => {
        expect(canvas.getByText('WikiTok')).toBeVisible();
      },
      { timeout: 5000 },
    );
    await userEvent.click(canvas.getByRole('button', { name: /about/i }));
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

export const LikesModal: Story = {
  play: async ({ canvas, userEvent }) => {
    await waitFor(
      () => {
        expect(canvas.getByText('WikiTok')).toBeVisible();
      },
      { timeout: 5000 },
    );
    await userEvent.click(canvas.getByRole('button', { name: /likes/i }));
    await waitFor(() => {
      expect(
        canvas.getByRole('heading', { name: /liked articles/i }),
      ).toBeVisible();
    });
    await expect(
      canvas.getByPlaceholderText(/search liked articles/i),
    ).toBeVisible();
  },
};

export const WithArticlesLoaded: Story = {
  play: async ({ canvas }) => {
    await waitFor(
      () => {
        expect(
          canvas.getByRole('heading', { name: /quantum mechanics/i }),
        ).toBeVisible();
      },
      { timeout: 10000 },
    );
    await expect(canvas.getAllByText(/read more/i).length).toBeGreaterThan(0);
  },
};
