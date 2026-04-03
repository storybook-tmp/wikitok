import type { Meta, StoryObj } from '@storybook/react-vite';
import { WikiCard } from './WikiCard';
import type { WikiArticle } from './WikiCard';

const mockArticle: WikiArticle = {
  title: 'Aurora Borealis',
  displaytitle: 'Aurora Borealis',
  extract:
    'An aurora, also commonly known as the northern lights or southern lights, is a natural light display in Earth\'s sky, predominantly seen in high-latitude regions. Auroras display dynamic patterns of brilliant lights that appear as curtains, rays, spirals, or dynamic flickers covering the entire sky.',
  pageid: 101,
  url: 'https://en.wikipedia.org/wiki/Aurora_(astronomy)',
  thumbnail: {
    source: 'https://picsum.photos/seed/aurora/800/600',
    width: 800,
    height: 600,
  },
};

const meta = {
  component: WikiCard,
  decorators: [
    (Story) => (
      <div style={{ height: '100vh', width: '100%', background: 'black', color: 'white' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof WikiCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <WikiCard article={mockArticle} />,
};

export const WithoutThumbnail: Story = {
  render: () => (
    <WikiCard
      article={{
        ...mockArticle,
        pageid: 202,
        title: 'Jazz',
        displaytitle: 'Jazz',
        extract:
          'Jazz is a music genre that originated in the African-American communities of New Orleans, Louisiana, in the late 19th and early 20th centuries, with its roots in blues and ragtime.',
        thumbnail: undefined as unknown as WikiArticle['thumbnail'],
      }}
    />
  ),
};

export const LongExtract: Story = {
  render: () => (
    <WikiCard
      article={{
        ...mockArticle,
        pageid: 303,
        title: 'History of Computing',
        displaytitle: 'History of Computing',
        extract:
          'The history of computing is longer than the history of computing hardware and modern computing technology and includes the history of methods intended for pen and paper or for chalk and slate, with or without the aid of tables. Computing is intimately tied to the representation of numbers, although strictly speaking, it is possible to represent numbers without a computing device. The earliest known tool for use in computation is the Sumerian abacus, and it was thought to have been invented in Babylon c. 2700-2300 BC. Its original style of usage was by lines drawn in sand with pebbles.',
      }}
    />
  ),
};

export const ShortTitle: Story = {
  render: () => (
    <WikiCard
      article={{
        ...mockArticle,
        pageid: 404,
        title: 'Pi',
        displaytitle: 'Pi',
        extract:
          'The number \u03c0 is a mathematical constant that is the ratio of a circle\'s circumference to its diameter, approximately equal to 3.14159. The number \u03c0 appears in many formulae across mathematics and physics.',
        thumbnail: {
          source: 'https://picsum.photos/seed/pi/800/600',
          width: 800,
          height: 600,
        },
      }}
    />
  ),
};
