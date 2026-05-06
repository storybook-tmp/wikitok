import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { WikiCard } from './WikiCard';

const meta = {
  component: WikiCard,
  tags: ['ai-generated'],
  args: {
    article: {
      title: 'Aurora Borealis',
      displaytitle: 'Aurora Borealis',
      extract:
        'An aurora, also commonly known as the northern lights, is a natural light display in Earth\'s sky, predominantly seen in high-latitude regions.',
      pageid: 12345,
      url: 'https://en.wikipedia.org/wiki/Aurora_Borealis',
      thumbnail: {
        source: 'https://placehold.co/800x600/1a1a2e/ffffff?text=Aurora',
        width: 800,
        height: 600,
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ height: '100vh', width: '100%', background: 'black' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof WikiCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('button', { name: /like article/i })
    ).toBeVisible();
    await expect(
      canvas.getByRole('button', { name: /share article/i })
    ).toBeVisible();
  },
};

export const WithLongExtract: Story = {
  args: {
    article: {
      title: 'Quantum Mechanics',
      displaytitle: 'Quantum Mechanics',
      extract:
        'Quantum mechanics is a fundamental theory that describes the behavior of nature at and below the scale of atoms. It is the foundation of all quantum physics, including quantum chemistry, quantum field theory, quantum technology, and quantum information science. Quantum mechanics differs from classical physics in that energy, momentum, angular momentum, and other quantities of a bound system are restricted to discrete values.',
      pageid: 99999,
      url: 'https://en.wikipedia.org/wiki/Quantum_mechanics',
      thumbnail: {
        source: 'https://placehold.co/800x600/2d3436/ffffff?text=Quantum',
        width: 800,
        height: 600,
      },
    },
  },
};

export const WithoutThumbnail: Story = {
  args: {
    article: {
      title: 'No Image Article',
      displaytitle: 'No Image Article',
      extract: 'This article has no thumbnail image.',
      pageid: 55555,
      url: 'https://en.wikipedia.org/wiki/No_Image',
      thumbnail: undefined as unknown as { source: string; width: number; height: number },
    },
  },
};

export const CssCheck: Story = {
  play: async ({ canvas }) => {
    const likeButton = canvas.getByRole('button', { name: /like article/i });
    // WikiCard like button uses p-2 (padding: 0.5rem = 8px) — fails if Tailwind CSS did not load
    await expect(getComputedStyle(likeButton).padding).toBe('8px');
  },
};
