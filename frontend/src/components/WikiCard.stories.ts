import type { Meta, StoryObj } from '@storybook/react-vite';
import { WikiCard } from './WikiCard';

const meta = {
  title: 'AI Generated/Complex/WikiCard',
  component: WikiCard,
  parameters: { layout: 'fullscreen' },
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
      pageid: 12345,
      url: 'https://en.wikipedia.org/wiki/Aurora',
      thumbnail: {
        source:
          'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600"><rect fill="%231a365d" width="800" height="600"/><text x="400" y="300" text-anchor="middle" fill="%2390cdf4" font-size="32">Aurora Borealis</text></svg>',
        width: 800,
        height: 600,
      },
    },
  },
};

export const WithoutThumbnail: Story = {
  args: {
    article: {
      title: 'Philosophy',
      displaytitle: 'Philosophy',
      extract:
        'Philosophy is the systematized study of general and fundamental questions, such as those concerning existence, reason, knowledge, values, mind, and language.',
      pageid: 67890,
      url: 'https://en.wikipedia.org/wiki/Philosophy',
      thumbnail: undefined as unknown as { source: string; width: number; height: number },
    },
  },
};
