import type { Meta, StoryObj } from '@storybook/react';
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

export const FullScreen: Story = {
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
};
