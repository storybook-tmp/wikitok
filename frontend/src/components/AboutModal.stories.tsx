import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

function AboutModal({ open = true, onClose }: { open?: boolean; onClose?: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 z-[41] p-6 rounded-lg max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white/70 hover:text-white"
        >
          ✕
        </button>
        <h2 className="text-xl font-bold mb-4 text-white">About WikiTok</h2>
        <p className="mb-4 text-white">
          A TikTok-style interface for exploring random Wikipedia articles.
        </p>
        <p className="text-white/70">
          Made with ❤️ by{' '}
          <span className="text-white">@Aizkmusic</span>
        </p>
        <p className="text-white/70 mt-2">
          Check out the code on{' '}
          <span className="text-white">GitHub</span>
        </p>
        <p className="text-white/70 mt-2">
          If you enjoy this project, you can{' '}
          <span className="text-white">buy me a coffee</span>! ☕
        </p>
      </div>
    </div>
  );
}

const meta = {
  title: 'AI Generated/Medium/AboutModal',
  component: AboutModal,
} satisfies Meta<typeof AboutModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {
  args: {
    open: true,
  },
};

export const WithToggle: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div className="bg-black p-4">
        <button
          onClick={() => setOpen(true)}
          className="text-sm text-white/70 hover:text-white transition-colors"
        >
          About
        </button>
        <AboutModal open={open} onClose={() => setOpen(false)} />
      </div>
    );
  },
};
