import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { WikiCard } from './WikiCard';
import { mockWikiArticles } from '../../.storybook/wikiMockData';

const meta = {
  component: WikiCard,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof WikiCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => renderWikiCardStory(mockWikiArticles[0]),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(() =>
      expect(
        canvas.getByRole('heading', { name: mockWikiArticles[0].displaytitle }),
      ).toBeVisible(),
    );
    await expect(
      canvas.getByRole('img', { name: mockWikiArticles[0].displaytitle }),
    ).toBeVisible();
    await expect(
      canvas.getByRole('link', { name: /read more/i }),
    ).toHaveAttribute('href', mockWikiArticles[0].url);
  },
};

export const ToggleLike: Story = {
  render: () => renderWikiCardStory(mockWikiArticles[1]),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const likeButton = canvas.getByRole('button', { name: /like article/i });
    await userEvent.click(likeButton);

    await waitFor(() => expect(likeButton.className).toContain('bg-red-500'));
    await expect(
      canvasElement.ownerDocument.querySelector('.heart-animation'),
    ).toBeInTheDocument();
  },
};

export const DoubleClickLikesCard: Story = {
  render: () => renderWikiCardStory(mockWikiArticles[2]),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.dblClick(
      canvas.getByRole('heading', { name: mockWikiArticles[2].displaytitle }),
    );

    await waitFor(() =>
      expect(canvas.getByRole('button', { name: /like article/i }).className).toContain(
        'bg-red-500',
      ),
    );
    await expect(
      canvas.getByText(mockWikiArticles[2].extract),
    ).toBeVisible();
  },
};

function renderWikiCardStory(article: (typeof mockWikiArticles)[number]) {
  return (
    <div className="min-h-screen w-full bg-black text-white">
      <div className="px-4 py-3 text-2xl font-bold">WikiTok</div>
      <div style={{ height: 'calc(100vh - 4.5rem)' }}>
        <WikiCard article={article} />
      </div>
    </div>
  );
}
