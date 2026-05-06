import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { WikiCard } from './WikiCard';
import type { WikiArticle } from './WikiCard';

const sampleArticle: WikiArticle = {
  title: 'Aurora Borealis',
  displaytitle: 'Aurora Borealis',
  extract:
    'An aurora is a natural light display in Earth\'s sky, predominantly seen in high-latitude regions. Auroras display dynamic patterns of brilliant lights that appear as curtains, rays, spirals, or dynamic flickers covering the entire sky.',
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
      title: 'Quantum Computing',
      displaytitle: 'Quantum Computing',
      extract:
        'Quantum computing is a type of computation that harnesses quantum mechanical phenomena such as superposition, interference, and entanglement. A quantum computer uses qubits to perform calculations exponentially faster than classical computers for certain problems. This technology promises to revolutionize fields including cryptography, drug discovery, and materials science. Researchers around the world are working to build practical quantum computers that can outperform classical systems.',
      pageid: 11111,
      url: 'https://en.wikipedia.org/wiki/Quantum_Computing',
    },
  },
};

export const LikeButton: Story = {
  args: { article: sampleArticle },
  play: async ({ canvas, userEvent }) => {
    const likeBtn = canvas.getByRole('button', { name: /like article/i });
    await userEvent.click(likeBtn);
    await expect(likeBtn).toHaveClass(/bg-red-500/);
  },
};

