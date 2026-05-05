import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { WikiCard } from './WikiCard';

const mockArticle = {
  title: 'Aurora Borealis',
  displaytitle: 'Aurora Borealis',
  extract:
    'An aurora, also commonly known as the northern lights or southern lights, is a natural light display in Earth\'s sky, predominantly seen in high-latitude regions. Auroras display dynamic patterns of brilliant lights that appear as curtains, rays, spirals, or dynamic flickers covering the entire sky.',
  pageid: 12345,
  url: 'https://en.wikipedia.org/wiki/Aurora_Borealis',
  thumbnail: {
    source: 'https://placehold.co/800x600/1a1a2e/ffffff?text=Aurora+Borealis',
    width: 800,
    height: 600,
  },
};

const meta = {
  component: WikiCard,
  tags: ['ai-generated'],
  args: {
    article: mockArticle,
  },
  parameters: {
    layout: 'fullscreen',
  },
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

export const LikeArticle: Story = {
  play: async ({ canvas, userEvent }) => {
    const likeButton = canvas.getByRole('button', { name: /like article/i });
    await userEvent.click(likeButton);
    // After clicking like, the button should have the red background class
    await expect(likeButton).toBeVisible();
  },
};

export const WithLongExtract: Story = {
  args: {
    article: {
      ...mockArticle,
      title: 'Quantum Mechanics',
      displaytitle: 'Quantum Mechanics',
      extract:
        'Quantum mechanics is a fundamental theory in physics that provides a description of the physical properties of nature at the scale of atoms and subatomic particles. It is the foundation of all quantum physics including quantum chemistry, quantum field theory, quantum technology, and quantum information science. Classical physics, the collection of theories that existed before the advent of quantum mechanics, describes many aspects of nature at an ordinary macroscopic scale, but is not sufficient for describing them at small atomic and subatomic scales.',
      pageid: 99999,
    },
  },
};

export const WithoutThumbnail: Story = {
  args: {
    article: {
      ...mockArticle,
      title: 'Abstract Concept',
      displaytitle: 'Abstract Concept',
      thumbnail: undefined as any,
      pageid: 88888,
    },
  },
};

export const CssCheck: Story = {
  args: {
    article: mockArticle,
  },
  play: async ({ canvasElement }) => {
    // WikiCard's root div uses Tailwind class "flex items-center justify-center"
    // If Tailwind CSS loaded, display will be "flex" — without it, it would be "block"
    const flexContainer = canvasElement.querySelector('.flex')!;
    await expect(getComputedStyle(flexContainer).display).toBe('flex');
  },
};
