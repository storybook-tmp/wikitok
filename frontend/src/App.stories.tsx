import type { Meta, StoryObj } from '@storybook/react-vite';
import { within } from 'storybook/test';
import App from './App';
import { mockArticles } from '../.storybook/mockData';
import { waitForStoryReady } from '../.storybook/waitForStoryReady';

const meta = {
  component: App,
} satisfies Meta<typeof App>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <App />,
  play: async ({ canvasElement }) => {
    await waitForStoryReady(canvasElement);
    const canvas = within(canvasElement);
    await canvas.findByRole('heading', { name: mockArticles[0].displaytitle });
  },
};

export const LikesOpen: Story = {
  render: Default.render,
  play: async ({ canvasElement, userEvent }) => {
    await waitForStoryReady(canvasElement);
    const canvas = within(canvasElement);
    await canvas.findByRole('heading', { name: mockArticles[0].displaytitle });
    await userEvent.click(await canvas.findByRole('button', { name: 'Likes' }));
    await canvas.findByRole('heading', { name: 'Liked Articles' });
  },
};

export const AboutOpen: Story = {
  render: Default.render,
  play: async ({ canvasElement, userEvent }) => {
    await waitForStoryReady(canvasElement);
    const canvas = within(canvasElement);
    await canvas.findByRole('heading', { name: mockArticles[0].displaytitle });
    await userEvent.click(await canvas.findByRole('button', { name: 'About' }));
    await canvas.findByRole('heading', { name: 'About WikiTok' });
  },
};
