import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
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
    await expect(
      await canvas.findByText('Aurora Borealis', {}, { timeout: 5000 })
    ).toBeVisible();
  },
};

export const AboutDialog: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByText('About'));
    await expect(canvas.getByText('About WikiTok')).toBeVisible();
  },
};

export const LikesPanel: Story = {
  play: async ({ canvas, userEvent }) => {
    await canvas.findByText('Aurora Borealis', {}, { timeout: 5000 });
    await userEvent.click(canvas.getByText('Likes'));
    await expect(canvas.getByText('Liked Articles')).toBeVisible();
  },
};
