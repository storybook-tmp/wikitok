import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { WikiCard } from './WikiCard';
import type { WikiArticle } from './WikiCard';

const sampleArticle: WikiArticle = {
  title: 'Quantum Computing',
  displaytitle: 'Quantum Computing',
  extract:
    'Quantum computing is a type of computation that harnesses quantum mechanical phenomena such as superposition and entanglement. A quantum computer uses quantum bits or qubits.',
  pageid: 12345,
  url: 'https://en.wikipedia.org/wiki/Quantum_computing',
  thumbnail: {
    source: 'https://placehold.co/800x600/333/white?text=Quantum+Computing',
    width: 800,
    height: 600,
  },
};

const meta = {
  component: WikiCard,
  tags: ['ai-generated'],
  args: {
    article: sampleArticle,
  },
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof WikiCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('link', { name: /quantum computing/i })).toHaveAttribute(
      'href',
      'https://en.wikipedia.org/wiki/Quantum_computing'
    );
  },
};

export const LongExtract: Story = {
  args: {
    article: {
      ...sampleArticle,
      title: 'History of the World',
      displaytitle: 'History of the World',
      extract:
        'The history of the world is the memory of the past experience of Homo sapiens sapiens around the world, as that experience has been preserved, largely in written records. By "prehistory", historians mean the recovery of knowledge of the past in an area where no written records exist, or where the writing of a culture is not understood. By studying painting, drawings, carvings, and other artifacts, some information can be recovered even in the absence of a written record. Since the 20th century, the study of prehistory is considered essential to avoid implicit exclusion of certain civilizations.',
    },
  },
};

export const NoThumbnail: Story = {
  args: {
    article: {
      ...sampleArticle,
      thumbnail: undefined as unknown as WikiArticle['thumbnail'],
    },
  },
};

