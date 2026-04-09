import type { Meta, StoryObj } from '@storybook/react-vite';

import { createElement } from 'react';
import { expect, userEvent, within } from 'storybook/test';

import {
  LikedArticlesProvider,
  useLikedArticles,
} from './LikedArticlesContext';
import type { WikiArticle } from '../components/WikiCard';

const article: WikiArticle = {
  title: 'Interaction testing',
  displaytitle: 'Interaction testing',
  extract:
    'Interaction testing helps confirm that the UI responds correctly as a user clicks through it.',
  pageid: 7001,
  url: 'https://storybook.js.org/docs/writing-tests/interaction-testing',
  thumbnail: {
    source:
      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><rect width="100%25" height="100%25" fill="%23111827"/><text x="50%25" y="50%25" fill="%23fff" font-family="Arial" font-size="28" text-anchor="middle">Interaction testing</text></svg>',
    width: 400,
    height: 300,
  },
};

function ProviderHarness() {
  const { likedArticles, isLiked, toggleLike } = useLikedArticles();
  const hasArticle = isLiked(article.pageid);

  return createElement(
    'div',
    { className: 'flex w-80 flex-col gap-3 rounded-lg bg-slate-900 p-4 text-white' },
    createElement('p', null, `Liked count: ${likedArticles.length}`),
    createElement('p', null, `Contains article: ${hasArticle ? 'yes' : 'no'}`),
    createElement(
      'button',
      {
        className: 'rounded bg-sky-500 px-3 py-2 text-sm font-medium',
        onClick: () => toggleLike(article),
        type: 'button',
      },
      hasArticle ? 'Remove article' : 'Add article',
    ),
    likedArticles[0]
      ? createElement('p', null, `Latest title: ${likedArticles[0].title}`)
      : null,
  );
}

const meta = {
  title: 'AI Generated/Complex/LikedArticlesProvider',
  component: LikedArticlesProvider,
  parameters: {
    layout: 'centered',
    withLikedArticlesProvider: false,
  },
  tags: ['autodocs'],
  render: () =>
    createElement(
      LikedArticlesProvider,
      null,
      createElement(ProviderHarness),
    ),
} satisfies Meta<typeof LikedArticlesProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const EmptyState: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(await canvas.findByText('Liked count: 0')).toBeVisible();

    await userEvent.click(await canvas.findByRole('button', { name: 'Add article' }));

    await expect(await canvas.findByText('Liked count: 1')).toBeVisible();
    await expect(await canvas.findByText('Contains article: yes')).toBeVisible();
  },
};

export const PrefilledState: Story = {
  beforeEach: () => {
    localStorage.setItem('likedArticles', JSON.stringify([article]));
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(await canvas.findByText('Liked count: 1')).toBeVisible();
    await expect(await canvas.findByText('Contains article: yes')).toBeVisible();
    await expect(
      await canvas.findByText(`Latest title: ${article.title}`),
    ).toBeVisible();
  },
};
