import type { Meta, StoryObj } from '@storybook/react';
import { WikiCard } from './WikiCard';
import type { WikiArticle } from './WikiCard';

const meta = {
  title: 'AI Generated/Medium/WikiCardBasic',
  component: WikiCard,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '100%', height: '600px', overflow: 'hidden' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof WikiCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const basicArticle: WikiArticle = {
  title: 'Digital Art',
  displaytitle: 'Digital Art',
  extract: 'Digital art is an artistic work or practice that uses digital technology as an essential part of the creative or presentation process.',
  pageid: 789,
  url: 'https://en.wikipedia.org/wiki/Digital_art',
  thumbnail: {
    source: 'https://images.unsplash.com/photo-1600298881974-6be191ceeda1?w=400&h=300&fit=crop',
    width: 400,
    height: 300,
  },
};

const landscapeArticle: WikiArticle = {
  title: 'Landscape Photography',
  displaytitle: 'Landscape Photography',
  extract: 'Landscape photography is a photographic technique to capture scenery of landscape.',
  pageid: 101,
  url: 'https://en.wikipedia.org/wiki/Landscape_photography',
  thumbnail: {
    source: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
    width: 400,
    height: 300,
  },
};

export const BasicRendering: Story = {
  args: {
    article: basicArticle,
  },
};

export const LandscapeImage: Story = {
  args: {
    article: landscapeArticle,
  },
};
