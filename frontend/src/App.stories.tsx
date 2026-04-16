import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { userEvent, within } from 'storybook/test';
import { seededLikedArticles } from '../.storybook/mock-data';
import App from './App';

const meta = {
  component: App,
} satisfies Meta<typeof App>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ViewportFrame>
      <App />
    </ViewportFrame>
  ),
};

export const AboutOpen: Story = {
  render: () => (
    <ViewportFrame>
      <App />
    </ViewportFrame>
  ),
  play: async (context) => {
    const canvas = within(context.canvasElement);

    await userEvent.click(canvas.getByRole('button', { name: 'About' }));
    await canvas.findByRole('heading', { name: 'About WikiTok' });
  },
};

export const LikesOpen: Story = {
  render: () => (
    <ViewportFrame>
      <App />
    </ViewportFrame>
  ),
  play: async (context) => {
    const canvas = within(context.canvasElement);

    await userEvent.click(canvas.getByRole('button', { name: 'Likes' }));
    await canvas.findByText(seededLikedArticles[0].title);
  },
};

function ViewportFrame({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-hidden bg-black" style={{ width: 393, height: 852 }}>
      {children}
    </div>
  );
}
