import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { WikiCard } from './WikiCard';

const meta: Meta<typeof WikiCard> = {
  component: WikiCard,
  tags: ['ai-generated'],
  decorators: [
    (Story) => (
      <div style={{ height: '100vh', width: '100%', background: '#000' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof WikiCard>;

export const LongExtract: Story = {
  args: {
    article: {
      title: 'History of Mathematics',
      displaytitle: 'History of Mathematics',
      extract:
        'The area of study known as the history of mathematics is primarily an investigation into the origin of discoveries in mathematics and the mathematical methods and notation of the past. Before the modern age and the worldwide spread of knowledge, written examples of new mathematical developments have come to light only in a few locales. From 3000 BC the Mesopotamian states of Sumer, Akkad and Assyria, followed closely by Ancient Egypt and the Levantine state of Ebla began using arithmetic, algebra and geometry for purposes of taxation, commerce, trade and also in the patterns in nature, the field of astronomy and to record time and formulate calendars.',
      pageid: 77777,
      url: 'https://en.wikipedia.org/wiki/History_of_mathematics',
      thumbnail: {
        source: 'https://placehold.co/800x600/2d3436/white?text=Mathematics',
        width: 800,
        height: 600,
      },
    },
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('History of Mathematics')).toBeVisible();
    await expect(canvas.getByText(/area of study known/)).toBeVisible();
    await expect(canvas.getByText('Read more →')).toBeVisible();
  },
};

export const ShortTitle: Story = {
  args: {
    article: {
      title: 'Pi',
      displaytitle: 'Pi',
      extract:
        'The number π is a mathematical constant approximately equal to 3.14159.',
      pageid: 88888,
      url: 'https://en.wikipedia.org/wiki/Pi',
      thumbnail: {
        source: 'https://placehold.co/800x600/6c5ce7/white?text=Pi',
        width: 800,
        height: 600,
      },
    },
  },
  play: async ({ canvas }) => {
    const heading = canvas.getByText('Pi');
    await expect(heading).toBeVisible();
    await expect(heading.tagName).toBe('H2');
  },
};

export const SpecialCharactersInTitle: Story = {
  args: {
    article: {
      title: 'Schrödinger\'s cat',
      displaytitle: 'Schrödinger\'s cat',
      extract:
        'In quantum mechanics, Schrödinger\'s cat is a thought experiment that illustrates a paradox of quantum superposition.',
      pageid: 44444,
      url: 'https://en.wikipedia.org/wiki/Schr%C3%B6dinger%27s_cat',
      thumbnail: {
        source: 'https://placehold.co/800x600/00b894/white?text=Cat',
        width: 800,
        height: 600,
      },
    },
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Schrödinger's cat")).toBeVisible();
    await expect(
      canvas.getByText(/thought experiment that illustrates/),
    ).toBeVisible();
  },
};
