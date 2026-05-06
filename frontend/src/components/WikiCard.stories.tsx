import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { WikiCard } from './WikiCard';

const sampleArticle = {
  title: 'Hummingbird',
  displaytitle: 'Hummingbird',
  extract:
    'Hummingbirds are birds native to the Americas and comprise the biological family Trochilidae. With about 366 currently known species, they occur from Alaska to Tierra del Fuego, but the vast majority of the species are found in the tropics.',
  pageid: 54321,
  url: 'https://en.wikipedia.org/wiki/Hummingbird',
  thumbnail: {
    source: 'https://via.placeholder.com/800x600',
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
    await expect(
      canvas.getByRole('link', { name: /hummingbird/i })
    ).toHaveAttribute('href', 'https://en.wikipedia.org/wiki/Hummingbird');
  },
};

export const LongExtract: Story = {
  args: {
    article: {
      ...sampleArticle,
      title: 'History of Computing',
      displaytitle: 'History of Computing',
      extract:
        'The history of computing is longer than the history of computing hardware and modern computing technology and includes the history of methods intended for pen and paper or for chalk and slate, with or without the aid of tables. Computing is intimately tied to the representation of numbers, although mathematical operations were not always the focus.',
      pageid: 99999,
    },
  },
};

