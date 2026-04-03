import type { Meta, StoryObj } from '@storybook/react-vite';
import { userEvent, within } from 'storybook/test';
import App from './App';

const meta = {
  component: App,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof App>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ height: '100vh', width: '100%' }}>
      <App />
    </div>
  ),
};

export const AboutOpen: Story = {
  render: () => (
    <div style={{ height: '100vh', width: '100%' }}>
      <App />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByText('About'));
  },
};

export const LikesPanel: Story = {
  render: () => (
    <div style={{ height: '100vh', width: '100%' }}>
      <App />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByText('Likes'));
  },
};
