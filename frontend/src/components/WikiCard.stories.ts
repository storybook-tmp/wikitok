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

export const Default: Story = {
  args: {
    article: {
      title: 'Ada Lovelace',
      displaytitle: 'Ada Lovelace',
      extract:
        'Augusta Ada King, Countess of Lovelace was an English mathematician and writer, chiefly known for her work on Charles Babbage\'s proposed mechanical general-purpose computer, the Analytical Engine. She is often regarded as the first computer programmer.',
      pageid: 12345,
      url: 'https://en.wikipedia.org/wiki/Ada_Lovelace',
      thumbnail: {
        source: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Ada_Lovelace_portrait.jpg/440px-Ada_Lovelace_portrait.jpg',
        width: 440,
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
        'Quantum computing is a type of computation that harnesses quantum mechanical phenomena such as superposition and entanglement to process information in fundamentally new ways.',
      pageid: 67890,
      url: 'https://en.wikipedia.org/wiki/Quantum_computing',
      thumbnail: undefined as unknown as { source: string; width: number; height: number },
    },
  },
};
