import type { Meta, StoryObj } from '@storybook/react-vite';
import { userEvent, within } from 'storybook/test';
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

export const Default: Story = {};

export const WithAboutModal: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const aboutButton = canvas.getByRole('button', { name: /about/i });
    await userEvent.click(aboutButton);
  },
};
