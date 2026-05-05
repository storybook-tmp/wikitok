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
    source: 'https://placehold.co/800x600/1a1a2e/ffffff?text=Quantum',
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
  args: { article: mockArticle },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('link', { name: /quantum computing/i })
    ).toHaveAttribute('href', 'https://en.wikipedia.org/wiki/Quantum_computing');
  },
};

export const LongExtract: Story = {
  args: {
    article: {
      ...mockArticle,
      pageid: 99999,
      title: 'History of Mathematics',
      displaytitle: 'History of Mathematics',
      extract:
        'The history of mathematics deals with the origin of discoveries in mathematics and the mathematical methods and notation of the past. Before the modern age and the worldwide spread of knowledge, written examples of new mathematical developments have come to light only in a few locales. From 3000 BC the Mesopotamian states of Sumer, Akkad and Assyria, followed closely by Ancient Egypt and the Levantine state of Ebla began using arithmetic, algebra and geometry for purposes of taxation, commerce, trade and also in the patterns in nature, the field of astronomy and to record time and formulate calendars.',
    },
  },
};

export const NoThumbnail: Story = {
  args: {
    article: {
      ...mockArticle,
      pageid: 88888,
      thumbnail: undefined as any,
    },
  },
};

export const CssCheck: Story = {
  args: { article: mockArticle },
  play: async ({ canvas, canvasElement }) => {
    // index.css sets `overflow: hidden` on body via Tailwind import — proves CSS loaded
    // Without the preview CSS import, body.overflow would be 'visible' (browser default)
    const body = canvasElement.ownerDocument.body;
    await expect(getComputedStyle(body).overflow).toBe('hidden');
  },
};
