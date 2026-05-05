import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';
import { WikiCard } from './WikiCard';
import type { WikiArticle } from './WikiCard';

const sampleArticle: WikiArticle = {
  title: 'Aurora Borealis',
  displaytitle: 'Aurora Borealis',
  extract:
    "An aurora, also commonly known as the northern lights or southern lights, is a natural light display in Earth's sky, predominantly seen in high-latitude regions. Auroras display dynamic patterns of brilliant lights that appear as curtains, rays, spirals, or dynamic flickers covering the entire sky.",
  pageid: 12345,
  url: 'https://en.wikipedia.org/wiki/Aurora_Borealis',
  thumbnail: {
    source:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Polarlicht_2.jpg/800px-Polarlicht_2.jpg',
    width: 800,
    height: 533,
  },
};

const meta = {
  component: WikiCard,
  tags: ['ai-generated'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof WikiCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    article: sampleArticle,
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('heading', { name: /aurora borealis/i }),
    ).toBeVisible();
    await expect(canvas.getByText(/read more/i)).toBeVisible();
    await expect(
      canvas.getByRole('button', { name: /like article/i }),
    ).toBeVisible();
    await expect(
      canvas.getByRole('button', { name: /share article/i }),
    ).toBeVisible();
  },
};

export const WithLongExtract: Story = {
  args: {
    article: {
      ...sampleArticle,
      title: 'Quantum Mechanics',
      displaytitle: 'Quantum Mechanics',
      extract:
        'Quantum mechanics is a fundamental theory in physics that provides a description of the physical properties of nature at the scale of atoms and subatomic particles. It is the foundation of all quantum physics including quantum chemistry, quantum field theory, quantum technology, and quantum information science. Classical physics, the collection of theories that existed before the advent of quantum mechanics, describes many aspects of nature at an ordinary macroscopic scale, but is not sufficient for describing them at small atomic and subatomic scales.',
      pageid: 99999,
    },
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('heading', { name: /quantum mechanics/i }),
    ).toBeVisible();
    await expect(canvas.getByText(/fundamental theory in physics/i)).toBeVisible();
  },
};

export const LikeInteraction: Story = {
  args: {
    article: sampleArticle,
  },
  play: async ({ canvas, userEvent }) => {
    const likeButton = canvas.getByRole('button', { name: /like article/i });
    await expect(likeButton).toBeVisible();
    await userEvent.click(likeButton);
    // After clicking like, the button should have a red background class
    await waitFor(() => {
      expect(likeButton.className).toMatch(/bg-red-500/);
    });
  },
};

export const CssCheck: Story = {
  args: {
    article: sampleArticle,
  },
  play: async ({ canvas }) => {
    const card = canvas.getByRole('heading', { name: /aurora borealis/i }).closest('div[class*="snap-start"]')!;
    // WikiCard container uses h-screen w-full flex — proves Tailwind CSS loaded
    await expect(getComputedStyle(card).display).toBe('flex');
  },
};
