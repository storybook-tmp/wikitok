import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import App from './App';

const meta = {
  component: App,
  render: () => (
    <div style={{ minHeight: '100vh', width: '100vw' }}>
      <App />
    </div>
  ),
} satisfies Meta<typeof App>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Feed: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(
      (await canvas.findAllByRole('link', { name: 'Basalt Garden' }))[0],
    ).toBeVisible();
  },
};

export const AboutOpen: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await canvas.findAllByRole('link', { name: 'Basalt Garden' });
    await userEvent.click(canvas.getByRole('button', { name: 'About' }));

    await expect(
      await canvas.findByRole('heading', { name: 'About WikiTok' }),
    ).toBeVisible();
  },
};

export const LikesOpen: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await canvas.findAllByRole('link', { name: 'Basalt Garden' });
    await userEvent.click(canvas.getByRole('button', { name: 'Likes' }));
    const likesPanel = canvas
      .getByPlaceholderText('Search liked articles...')
      .closest('div.bg-gray-900');

    await expect(
      await canvas.findByRole('heading', { name: 'Liked Articles' }),
    ).toBeVisible();
    if (!likesPanel) {
      throw new Error('Expected the liked articles panel to render.');
    }
    await expect(
      within(likesPanel).getByRole('link', { name: 'Aurora Basin' }),
    ).toBeVisible();
  },
};

export const LikesSearch: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await canvas.findAllByRole('link', { name: 'Basalt Garden' });
    await userEvent.click(canvas.getByRole('button', { name: 'Likes' }));
    await userEvent.type(
      canvas.getByPlaceholderText('Search liked articles...'),
      'citadel',
    );
    const likesPanel = canvas
      .getByPlaceholderText('Search liked articles...')
      .closest('div.bg-gray-900');

    if (!likesPanel) {
      throw new Error('Expected the liked articles panel to render.');
    }
    await expect(
      within(likesPanel).getByRole('link', { name: 'Citadel of Glass' }),
    ).toBeVisible();
    await expect(
      within(likesPanel).queryByRole('link', { name: 'Aurora Basin' }),
    ).not.toBeInTheDocument();
  },
};
