import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { WikiCard } from './WikiCard';

const meta = {
  component: WikiCard,
  tags: ['ai-generated'],
  args: {
    article: {
      title: 'Mount Everest',
      displaytitle: 'Mount Everest',
      extract:
        'Mount Everest is the highest mountain in the world, located in the Himalayas on the border between Nepal and Tibet. It stands at 8,849 metres above sea level.',
      pageid: 12345,
      url: 'https://en.wikipedia.org/wiki/Mount_Everest',
      thumbnail: {
        source: 'https://placehold.co/800x600/222/white?text=Mount+Everest',
        width: 800,
        height: 600,
      },
    },
  },
} satisfies Meta<typeof WikiCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('link', { name: /mount everest/i })
    ).toHaveAttribute('href', 'https://en.wikipedia.org/wiki/Mount_Everest');
  },
};

export const Liked: Story = {
  play: async ({ canvas, userEvent }) => {
    const likeButton = canvas.getByRole('button', { name: /like article/i });
    await userEvent.click(likeButton);
    await expect(likeButton.className).toContain('bg-red-500');
  },
};

export const LongExtract: Story = {
  args: {
    article: {
      title: 'History of Mathematics',
      displaytitle: 'History of Mathematics',
      extract:
        'The history of mathematics deals with the origin of discoveries in mathematics and the mathematical methods and notation of the past. Before the modern age and the worldwide spread of knowledge, written examples of new mathematical developments have come to light only in a few locales. From 3000 BC the Mesopotamian states of Sumer, Akkad and Assyria, followed closely by Ancient Egypt and the Levantine state of Ebla began using arithmetic, algebra and geometry for purposes of taxation, commerce, trade and also in the patterns in nature, the field of astronomy and to record time and formulate calendars.',
      pageid: 99999,
      url: 'https://en.wikipedia.org/wiki/History_of_mathematics',
      thumbnail: {
        source: 'https://placehold.co/800x600/444/white?text=Mathematics',
        width: 800,
        height: 600,
      },
    },
  },
};

export const CssCheck: Story = {
  play: async ({ canvasElement }) => {
    // Article.css sets .article-container padding: 1rem — but WikiCard doesn't use it.
    // Instead verify Tailwind preflight loaded: h2 should have margin: 0 (preflight reset)
    const heading = canvasElement.querySelector('h2');
    await expect(heading).not.toBeNull();
    const style = getComputedStyle(heading!);
    // Tailwind v4 preflight resets h2 margin to 0
    await expect(style.margin).toBe('0px');
  },
};
