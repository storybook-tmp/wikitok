import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';
import { WikiCard } from './WikiCard';
import type { WikiArticle } from './WikiCard';

const sampleArticle: WikiArticle = {
  title: 'Aurora Borealis',
  displaytitle: 'Aurora Borealis',
  extract:
    'An aurora is a natural light display in the sky, predominantly seen in high-latitude regions. Auroras display dynamic patterns of brilliant lights that appear as curtains, rays, spirals, or dynamic flickers covering the entire sky.',
  pageid: 12345,
  url: 'https://en.wikipedia.org/wiki/Aurora_Borealis',
  thumbnail: {
    source: 'https://placehold.co/800x600/1a1a2e/ffffff?text=Aurora',
    width: 800,
    height: 600,
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
  args: { article: sampleArticle },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('link', { name: /aurora borealis/i })
    ).toHaveAttribute('href', 'https://en.wikipedia.org/wiki/Aurora_Borealis');
  },
};

export const LongExtract: Story = {
  args: {
    article: {
      ...sampleArticle,
      pageid: 99999,
      title: 'Quantum Mechanics',
      displaytitle: 'Quantum Mechanics',
      extract:
        'Quantum mechanics is a fundamental theory in physics that describes the behavior of nature at and below the scale of atoms. It is the foundation of all quantum physics including quantum chemistry, quantum field theory, quantum technology, and quantum information science. Classical physics describes matter and energy at a scale familiar to human experience. Quantum mechanics explains the behavior of matter and its interactions with energy on the scale of atomic and subatomic particles.',
      url: 'https://en.wikipedia.org/wiki/Quantum_mechanics',
    },
  },
};

export const CssCheck: Story = {
  args: { article: sampleArticle },
  play: async ({ canvasElement }) => {
    const html = canvasElement.ownerDocument.documentElement;
    // index.css sets overscroll-behavior-y: contain on html — fails if app CSS did not load
    await waitFor(() => {
      expect(getComputedStyle(html).overscrollBehaviorY).toBe('contain');
    });
  },
};

export const Liked: Story = {
  args: { article: sampleArticle },
  play: async ({ canvas, userEvent }) => {
    const likeButton = canvas.getByRole('button', { name: /like article/i });
    await userEvent.click(likeButton);
    // After clicking, the button should have the red background class applied
    await expect(likeButton.className).toMatch(/bg-red-500/);
  },
};
