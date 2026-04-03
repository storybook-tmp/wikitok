import type { Meta, StoryObj } from '@storybook/react-vite';
import { WikiCard } from './WikiCard';
import type { WikiArticle } from './WikiCard';

const mockArticle: WikiArticle = {
  pageid: 2001,
  title: 'Aurora Borealis',
  displaytitle: 'Aurora Borealis',
  extract:
    "An aurora, also commonly known as the northern lights or southern lights, is a natural light display in Earth's sky, predominantly seen in high-latitude regions. Auroras display dynamic patterns of brilliant lights that appear as curtains, rays, spirals, or dynamic flickers.",
  url: 'https://en.wikipedia.org/wiki/Aurora_(astronomy)',
  thumbnail: {
    source:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600'%3E%3Cdefs%3E%3ClinearGradient id='a' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23065'/%3E%3Cstop offset='1' stop-color='%23113'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23a)' width='800' height='600'/%3E%3C/svg%3E",
    width: 800,
    height: 600,
  },
};

const meta = {
  component: WikiCard,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={{ height: '100vh', width: '100%', overflowY: 'auto', background: '#000' }}>
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

export const Liked: Story = {
  async beforeEach() {
    localStorage.setItem('likedArticles', JSON.stringify([mockArticle]));
  },
  render: () => <WikiCard article={mockArticle} />,
};

export const LongExtract: Story = {
  render: () => (
    <WikiCard
      article={{
        ...mockArticle,
        pageid: 2002,
        title: 'History of Mathematics',
        displaytitle: 'History of Mathematics',
        extract:
          'The history of mathematics deals with the origin of discoveries in mathematics and the mathematical methods and notation of the past. Before the modern age and the worldwide spread of knowledge, written examples of new mathematical developments have come to light only in a few locales. From 3000 BC the Mesopotamian states of Sumer, Akkad and Assyria, followed closely by Ancient Egypt and the Levantine state of Ebla began using arithmetic, algebra and geometry for purposes of taxation, commerce, trade and also in the patterns in nature, the field of astronomy and to record time and formulate calendars.',
        url: 'https://en.wikipedia.org/wiki/History_of_mathematics',
      }}
    />
  ),
};
