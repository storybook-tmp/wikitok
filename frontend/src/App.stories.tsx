import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import App from './App';
import type { WikiArticle } from './components/WikiCard';

const meta = {
  component: App,
  render: renderAppInViewportShell,
} satisfies Meta<typeof App>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Feed: Story = {
  play: waitForFeed,
};

export const AboutModal: Story = {
  play: async ({ canvasElement }) => {
    const canvas = await waitForFeed({ canvasElement });

    await userEvent.click(await canvas.findByRole('button', { name: 'About' }));

    await expect(canvas.getByRole('heading', { name: 'About WikiTok' })).toBeInTheDocument();
  },
};

export const SavedArticles: Story = {
  parameters: {
    appState: {
      likedArticles: buildSavedArticles(),
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = await waitForFeed({ canvasElement });

    await userEvent.click(await canvas.findByRole('button', { name: 'Likes' }));

    await expect(canvas.getByRole('heading', { name: 'Liked Articles' })).toBeInTheDocument();
    await expect(canvas.getByRole('link', { name: 'Orbiting Conservatory' })).toBeInTheDocument();
  },
};

async function waitForFeed({ canvasElement }: { canvasElement: HTMLElement }) {
  const canvas = within(canvasElement);
  const headings = await canvas.findAllByRole('heading', { name: /Aurora Gardens/ });

  expect(headings.length).toBeGreaterThan(0);

  return canvas;
}

function buildSavedArticles(): WikiArticle[] {
  return [
    {
      title: 'Orbiting Conservatory',
      displaytitle: 'Orbiting Conservatory',
      extract:
        'Orbiting Conservatory is a fictional research habitat known for suspended orchid terraces and a public archive of climate experiments.',
      pageid: 9001,
      url: 'https://en.wikipedia.org/wiki/Orbiting_Conservatory',
      thumbnail: {
        source: buildArticleImage('#2563eb', 'Orbiting Conservatory'),
        width: 960,
        height: 1440,
      },
    },
    {
      title: 'Basalt Promenade',
      displaytitle: 'Basalt Promenade',
      extract:
        'Basalt Promenade is an imagined waterfront district remembered for stepped embankments, market halls, and a century of lantern processions.',
      pageid: 9002,
      url: 'https://en.wikipedia.org/wiki/Basalt_Promenade',
      thumbnail: {
        source: buildArticleImage('#0f766e', 'Basalt Promenade'),
        width: 960,
        height: 1440,
      },
    },
  ];
}

function renderAppInViewportShell() {
  return (
    <div className="w-full overflow-hidden bg-black" style={{ height: '100svh' }}>
      <App />
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
      <text
        x="72"
        y="1210"
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
