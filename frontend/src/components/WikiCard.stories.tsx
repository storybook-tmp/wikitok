import type { Meta, StoryObj } from '@storybook/react-vite';
import { WikiCard } from './WikiCard';
import type { WikiArticle } from './WikiCard';

const mockArticle: WikiArticle = {
  title: 'Monarch Butterfly',
  displaytitle: 'Monarch Butterfly',
  extract:
    'The monarch butterfly (Danaus plexippus) is a milkweed butterfly in the family Nymphalidae. It is perhaps the best known of all North American butterflies and is considered an iconic pollinator species.',
  pageid: 101,
  url: 'https://en.wikipedia.org/wiki/Monarch_butterfly',
  thumbnail: {
    source:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600'%3E%3Crect width='800' height='600' fill='%231e3a5f'/%3E%3C/svg%3E",
    width: 800,
    height: 600,
  },
};

const meta = {
  component: WikiCard,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof WikiCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ height: '100vh', width: '100%' }}>
      <WikiCard article={mockArticle} />
    </div>
  ),
};

export const Liked: Story = {
  async beforeEach() {
    localStorage.setItem('likedArticles', JSON.stringify([mockArticle]));
  },
  render: () => (
    <div style={{ height: '100vh', width: '100%' }}>
      <WikiCard article={mockArticle} />
    </div>
  ),
};

export const LongExtract: Story = {
  render: () => (
    <div style={{ height: '100vh', width: '100%' }}>
      <WikiCard
        article={{
          ...mockArticle,
          title: 'History of Mathematics',
          displaytitle: 'History of Mathematics',
          extract:
            'The history of mathematics deals with the origin of discoveries in mathematics and the mathematical methods and notation of the past. Before the modern age and the worldwide spread of knowledge, written examples of new mathematical developments have come to light only in a few locales. From 3000 BC the Mesopotamian states of Sumer, Akkad and Assyria, followed closely by Ancient Egypt and the Levantine state of Ebla began using arithmetic, algebra and geometry for purposes of taxation, commerce, trade and also in the patterns in nature, the field of astronomy and to record time and formulate calendars.',
          pageid: 999,
        }}
      />
    </div>
  ),
};
