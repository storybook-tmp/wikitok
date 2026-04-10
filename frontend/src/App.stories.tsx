import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent, waitFor } from 'storybook/test';
import App from './App';

const meta = {
  component: App,
} satisfies Meta<typeof App>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <App />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Articles may appear multiple times due to buffering — use findAll
    const headings = await canvas.findAllByRole('heading', {
      name: /eiffel tower/i,
    });
    await expect(headings[0]).toBeVisible();
    await expect(canvas.getByRole('button', { name: /wikitok/i })).toBeVisible();
    await expect(canvas.getByRole('button', { name: /about/i })).toBeVisible();
    await expect(canvas.getByRole('button', { name: /likes/i })).toBeVisible();
  },
};

export const AboutModal: Story = {
  render: () => <App />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const aboutButton = canvas.getByRole('button', { name: /about/i });
    await userEvent.click(aboutButton);
    await expect(
      canvas.getByRole('heading', { name: /about wikitok/i })
    ).toBeVisible();
    await expect(canvas.getByText(/tiktok-style interface/i)).toBeVisible();
    await expect(canvas.getByText(/github/i)).toBeVisible();
  },
};

export const LikesModal: Story = {
  render: () => <App />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const likesButton = canvas.getByRole('button', { name: /likes/i });
    await userEvent.click(likesButton);
    await expect(
      canvas.getByRole('heading', { name: /liked articles/i })
    ).toBeVisible();
    await expect(
      canvas.getByPlaceholderText(/search liked articles/i)
    ).toBeVisible();
    await expect(canvas.getByText(/no liked articles yet/i)).toBeVisible();
  },
};
