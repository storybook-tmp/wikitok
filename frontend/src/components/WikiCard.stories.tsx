import type { Meta, StoryObj } from '@storybook/react-vite';
import { WikiCard } from './WikiCard';

const meta = {
  title: 'AI Generated/Complex/WikiCard',
  component: WikiCard,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof WikiCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithThumbnail: Story = {
  args: {
    article: {
      title: 'Aurora Borealis',
      displaytitle: 'Aurora Borealis',
      extract:
        'An aurora, also commonly known as the northern lights or southern lights, is a natural light display in Earth\'s sky, predominantly seen in high-latitude regions around the Arctic and Antarctic.',
      pageid: 12345,
      url: 'https://en.wikipedia.org/wiki/Aurora',
      thumbnail: {
        source:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Polarlicht_2.jpg/800px-Polarlicht_2.jpg',
        width: 800,
        height: 600,
      },
    },
  },
};

export const WithoutThumbnail: Story = {
  args: {
    article: {
      title: 'Quantum Computing',
      displaytitle: 'Quantum Computing',
      extract:
        'Quantum computing is a type of computation that harnesses the collective properties of quantum states, such as superposition, interference, and entanglement, to perform calculations.',
      pageid: 67890,
      url: 'https://en.wikipedia.org/wiki/Quantum_computing',
      thumbnail: undefined as unknown as { source: string; width: number; height: number },
    },
  },
};
