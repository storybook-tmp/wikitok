import type { Meta, StoryObj } from '@storybook/react-vite';
import { WikiCard } from './WikiCard';

const meta = {
  title: 'AI Generated/Medium/WikiCard',
  component: WikiCard,
} satisfies Meta<typeof WikiCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithThumbnail: Story = {
  args: {
    article: {
      title: 'Aurora Borealis',
      displaytitle: 'Aurora Borealis',
      extract:
        'An aurora is a natural light display in Earth\'s sky, predominantly seen in high-latitude regions. Auroras display dynamic patterns of brilliant lights that appear as curtains, rays, spirals, or dynamic flickers covering the entire sky.',
      pageid: 12345,
      url: 'https://en.wikipedia.org/wiki/Aurora',
      thumbnail: {
        source: 'https://placehold.co/800x600',
        width: 800,
        height: 600,
      },
    },
  },
};

export const WithoutThumbnail: Story = {
  args: {
    article: {
      title: 'Quantum Mechanics',
      displaytitle: 'Quantum Mechanics',
      extract:
        'Quantum mechanics is a fundamental theory in physics that describes the behavior of nature at and below the scale of atoms.',
      pageid: 67890,
      url: 'https://en.wikipedia.org/wiki/Quantum_mechanics',
      thumbnail: undefined as unknown as { source: string; width: number; height: number },
    },
  },
};
