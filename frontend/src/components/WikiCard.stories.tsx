import type { Meta, StoryObj } from '@storybook/react-vite';
import { WikiCard } from './WikiCard';

const meta = {
  title: 'AI Generated/Medium/WikiCard',
  component: WikiCard,
  decorators: [
    (Story) => (
      <div style={{ height: '100vh', width: '100%', background: '#000' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof WikiCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    article: {
      title: 'Aurora Borealis',
      displaytitle: 'Aurora Borealis',
      extract:
        'An aurora, also commonly known as the northern lights or southern lights, is a natural light display in Earth\'s sky, predominantly seen in high-latitude regions. Auroras display dynamic patterns of brilliant lights that appear as curtains, rays, spirals, or dynamic flickers covering the entire sky.',
      pageid: 42981,
      url: 'https://en.wikipedia.org/wiki/Aurora_(astronomy)',
      thumbnail: {
        source:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Polarlicht_2.jpg/800px-Polarlicht_2.jpg',
        width: 800,
        height: 600,
      },
    },
  },
};

export const LongExtract: Story = {
  args: {
    article: {
      title: 'History of Mathematics',
      displaytitle: 'History of Mathematics',
      extract:
        'The history of mathematics deals with the origin of discoveries in mathematics and the mathematical methods and notation of the past. Before the modern age and the worldwide spread of knowledge, written examples of new mathematical developments have come to light only in a few locales. From 3000 BC the Mesopotamian states of Sumer, Akkad and Assyria, followed closely by Ancient Egypt and the Levantine state of Ebla began using arithmetic, algebra and geometry for purposes of taxation, commerce, trade and also in the patterns in nature, the field of astronomy and to record time and formulate calendars.',
      pageid: 18831,
      url: 'https://en.wikipedia.org/wiki/History_of_mathematics',
      thumbnail: {
        source:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Euclid.jpg/800px-Euclid.jpg',
        width: 800,
        height: 1000,
      },
    },
  },
};
