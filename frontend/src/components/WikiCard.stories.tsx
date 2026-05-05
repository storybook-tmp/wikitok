import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { WikiCard } from './WikiCard';

const mockArticle = {
  title: 'Quantum Computing',
  displaytitle: 'Quantum Computing',
  extract:
    'Quantum computing is a type of computation that harnesses quantum mechanical phenomena such as superposition and entanglement. A quantum computer uses quantum bits or qubits.',
  pageid: 12345,
  url: 'https://en.wikipedia.org/wiki/Quantum_computing',
  thumbnail: {
    source: 'https://via.placeholder.com/800x600/1a1a2e/ffffff?text=Quantum',
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
    const heading = canvas.getByRole('heading', { name: /quantum computing/i });
    await expect(heading).toBeVisible();
    await expect(canvas.getByRole('button', { name: /like article/i })).toBeVisible();
    await expect(canvas.getByRole('button', { name: /share article/i })).toBeVisible();
  },
};

export const WithLongExtract: Story = {
  args: {
    article: {
      ...mockArticle,
      title: 'History of the Roman Empire',
      displaytitle: 'History of the Roman Empire',
      extract:
        'The Roman Empire was the post-Republican state of ancient Rome. It included territory in Europe, North Africa, and Western Asia, and was ruled by emperors. The Roman Empire was one of the largest empires in the ancient world, with an estimated 50 to 90 million inhabitants, roughly 20% of the world\'s population at the time. It covered around 5 million square kilometers at its height in AD 117.',
    },
  },
};

export const WithoutThumbnail: Story = {
  args: {
    article: {
      ...mockArticle,
      title: 'Abstract Mathematics',
      displaytitle: 'Abstract Mathematics',
      thumbnail: undefined as unknown as typeof mockArticle.thumbnail,
    },
  },
};

