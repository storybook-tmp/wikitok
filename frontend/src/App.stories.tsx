import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import App from './App';
import { mockFeedArticles } from '../.storybook/wiki-mocks';

const meta = {
  component: App,
} satisfies Meta<typeof App>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <App />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.findByRole('link', { name: mockFeedArticles[0].displaytitle }),
    ).resolves.toBeVisible();
  },
};

export const AboutOpen: Story = {
  render: () => <App />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.findByRole('link', { name: mockFeedArticles[0].displaytitle }),
    ).resolves.toBeVisible();
    await userEvent.click(await canvas.findByRole('button', { name: 'About' }));
    await expect(
      canvas.findByRole('heading', { name: 'About WikiTok' }),
    ).resolves.toBeVisible();
  },
};

export const LikesOpen: Story = {
  render: () => <App />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.findByRole('link', { name: mockFeedArticles[0].displaytitle }),
    ).resolves.toBeVisible();
    await userEvent.click(await canvas.findByRole('button', { name: 'Likes' }));
    await expect(
      canvas.findByRole('heading', { name: 'Liked Articles' }),
    ).resolves.toBeVisible();
  },
};
