import type { Meta, StoryObj } from '@storybook/react-vite';

import { WikiCard } from './WikiCard';

const scenicImage =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 800'%3E%3Cdefs%3E%3ClinearGradient id='sky' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0%25' stop-color='%230f172a'/%3E%3Cstop offset='100%25' stop-color='%2338bdf8'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='1200' height='800' fill='url(%23sky)'/%3E%3Ccircle cx='960' cy='180' r='90' fill='%23fde68a' fill-opacity='0.85'/%3E%3Cpath d='M0 620 Q220 500 460 590 T1200 560 V800 H0 Z' fill='%231f2937'/%3E%3Cpath d='M0 690 Q260 560 520 650 T1200 640 V800 H0 Z' fill='%230b1120'/%3E%3C/svg%3E";

const meta = {
  title: 'AI Generated/Complex/WikiCard',
  component: WikiCard,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    article: {
      title: 'Aurora',
      displaytitle: 'Aurora over the Arctic',
      extract:
        'Auroras form when energetic particles from the Sun collide with gases in Earth’s upper atmosphere and create curtains of color.',
      pageid: 101,
      url: 'https://example.com/articles/aurora',
      thumbnail: {
        source: scenicImage,
        width: 1200,
        height: 800,
      },
    },
  },
} satisfies Meta<typeof WikiCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LongExcerpt: Story = {
  args: {
    article: {
      title: 'Bioluminescent Bays',
      displaytitle: 'Bioluminescent Bays',
      extract:
        'Some coastal bays glow at night because microscopic organisms emit light when the water is disturbed. Visitors often see bright blue trails around paddles, fish, and even footprints in shallow water, creating a surreal nighttime landscape that feels almost animated.',
      pageid: 102,
      url: 'https://example.com/articles/bioluminescent-bays',
      thumbnail: {
        source: scenicImage,
        width: 1200,
        height: 800,
      },
    },
  },
};
