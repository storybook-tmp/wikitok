import type { Meta, StoryObj } from '@storybook/react-vite';
import App from './App';

const meta = {
  title: 'AI Generated/Complex/App',
  component: App,
} satisfies Meta<typeof App>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const FullScreen: Story = {
  parameters: {
    layout: 'fullscreen',
  },
};
