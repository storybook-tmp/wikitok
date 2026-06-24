import type { Meta, StoryObj } from '@storybook/react-vite';

import { expect, userEvent, within } from 'storybook/test';

import {
  LikedArticlesProvider,
  useLikedArticles,
} from './LikedArticlesContext';

const sampleArticle = {
  title: 'Cinder Peak',
  displaytitle: 'Cinder Peak',
  extract: 'A sample article used to demonstrate liking and unliking from context.',
  pageid: 202,
  url: 'https://en.wikipedia.org/wiki/Cinder_Peak',
  thumbnail: {
    source:
      'data:image/svg+xml;utf8,' +
      encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240">
          <rect width="320" height="240" fill="#111827" />
          <path d="M32 184l68-88 52 64 52-80 84 104z" fill="#fb7185" opacity="0.7" />
        </svg>`,
      ),
    width: 320,
    height: 240,
  },
};

function ProviderDemo() {
  const { likedArticles, toggleLike, isLiked } = useLikedArticles();

  return (
    <div className="rounded-xl bg-slate-900 p-6 text-white shadow-lg">
      <p className="mb-3 text-sm text-white/70">Liked articles: {likedArticles.length}</p>
      <button
        type="button"
        className="rounded-md bg-sky-500 px-4 py-2 font-medium text-slate-950"
        onClick={() => toggleLike(sampleArticle)}
      >
        {isLiked(sampleArticle.pageid) ? 'Remove from likes' : 'Add to likes'}
      </button>
    </div>
  );
}

const meta = {
  title: 'AI Generated/Complex/LikedArticlesProvider',
  component: LikedArticlesProvider,
  parameters: {
    layout: 'centered',
  },
  render: () => (
    <LikedArticlesProvider>
      <ProviderDemo />
    </LikedArticlesProvider>
  ),
} satisfies Meta<typeof LikedArticlesProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const EmptyCollection: Story = {};

export const AddsArticle: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: /add to likes/i }));
    await expect(canvas.getByText(/liked articles: 1/i)).toBeInTheDocument();
  },
};
