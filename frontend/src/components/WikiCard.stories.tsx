import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { WikiCard } from './WikiCard';

const mockArticle = {
  title: 'Aurora Borealis',
  displaytitle: 'Aurora Borealis',
  extract:
    'An aurora, also commonly known as the northern lights or southern lights, is a natural light display in Earth\'s sky, predominantly seen in high-latitude regions.',
  pageid: 12345,
  url: 'https://en.wikipedia.org/wiki/Aurora_Borealis',
  thumbnail: {
    source: 'https://placehold.co/800x600/1a1a2e/ffffff?text=Aurora',
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
    await expect(canvas.getByRole('link', { name: /aurora borealis/i })).toHaveAttribute(
      'href',
      'https://en.wikipedia.org/wiki/Aurora_Borealis'
    );
  },
};

export const LongExtract: Story = {
  args: {
    article: {
      ...mockArticle,
      extract:
        'This is a very long extract that goes on and on. '.repeat(20),
    },
  },
};

export const NoThumbnail: Story = {
  args: {
    article: {
      ...mockArticle,
      thumbnail: undefined as any,
    },
  },
};
