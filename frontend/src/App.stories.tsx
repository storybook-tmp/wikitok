import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import App from './App';

const meta = {
  component: App,
} satisfies Meta<typeof App>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <App />,
};

export const AboutOpen: Story = {
  render: () => <App />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(await canvas.findByRole('button', { name: 'About' }));

    await expect(
      canvas.getByRole('heading', { name: 'About WikiTok' }),
    ).toBeInTheDocument();
  },
};

export const LikesOpen: Story = {
  render: () => <App />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(await canvas.findByRole('button', { name: 'Likes' }));

    await expect(
      canvas.getByRole('heading', { name: 'Liked Articles' }),
    ).toBeInTheDocument();
  },
};
