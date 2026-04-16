import type { Meta, StoryObj } from '@storybook/react-vite';
import { WikiCard, type WikiArticle } from './WikiCard';

const meta = {
  component: WikiCard,
  args: {
    article: buildFeaturedArticle(),
  },
  render: renderWikiCardInFeed,
} satisfies Meta<typeof WikiCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Liked: Story = {
  parameters: {
    appState: {
      likedArticles: [buildFeaturedArticle()],
    },
  },
};

export const LongCopy: Story = {
  args: {
    article: buildLongCopyArticle(),
  },
};

function buildFeaturedArticle(): WikiArticle {
  return {
    title: 'Aurora Gardens',
    displaytitle: 'Aurora Gardens',
    extract:
      'Aurora Gardens is a fictional botanical landmark known for glass canopies, tidal walkways, and a rotating collection of night-blooming plants gathered from coastal climates around the world.',
    pageid: 101,
    url: 'https://en.wikipedia.org/wiki/Aurora_Gardens',
    thumbnail: {
      source: buildArticleImage('#0f766e', 'Aurora Gardens'),
      width: 960,
      height: 1440,
    },
  };
}

function buildLongCopyArticle(): WikiArticle {
  return {
    title: 'Cloud Archive',
    displaytitle: 'Cloud Archive Observatory',
    extract:
      'Cloud Archive is a speculative hilltop library preserved for its spiral reading rooms, multilingual map collection, and unusually detailed records of local weather traditions. The card keeps the same structure the app uses for every fetched article, but this story stretches the title and summary so the overlay layout can be checked under denser content.',
    pageid: 102,
    url: 'https://en.wikipedia.org/wiki/Cloud_Archive',
    thumbnail: {
      source: buildArticleImage('#1d4ed8', 'Cloud Archive'),
      width: 960,
      height: 1440,
    },
  };
}

function renderWikiCardInFeed(args: { article: WikiArticle }) {
  return (
    <div className="w-full overflow-hidden bg-black" style={{ height: '100svh' }}>
      <div className="h-full w-full overflow-y-auto snap-y snap-mandatory hide-scroll">
        <WikiCard {...args} />
      </div>
    </div>
  );
}

function buildArticleImage(accent: string, label: string) {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 1440">
      <defs>
        <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="${accent}" />
          <stop offset="100%" stop-color="#020617" />
        </linearGradient>
      </defs>
      <rect width="960" height="1440" fill="url(#bg)" />
      <circle cx="740" cy="260" r="190" fill="rgba(255,255,255,0.18)" />
      <circle cx="220" cy="1120" r="240" fill="rgba(255,255,255,0.08)" />
      <text
        x="72"
        y="1200"
        fill="white"
        font-size="92"
        font-family="system-ui, sans-serif"
        font-weight="700"
      >
        ${label}
      </text>
    </svg>
  `.replace(/\s+/g, ' ').trim())}`;
}
