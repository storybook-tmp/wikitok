import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent } from 'storybook/test';
import { WikiCard, type WikiArticle } from './WikiCard';

const mockArticle: WikiArticle = {
  pageid: 12345,
  title: 'Eiffel Tower',
  displaytitle: 'Eiffel Tower',
  extract:
    'The Eiffel Tower is a wrought-iron lattice tower on the Champ de Mars in Paris, France. Named after the engineer Gustave Eiffel, whose company designed and built the tower from 1887 to 1889.',
  thumbnail: {
    source:
      'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
    width: 800,
    height: 600,
  },
  url: 'https://en.wikipedia.org/wiki/Eiffel_Tower',
};

const fullScreenWrapper = {
  style: { height: '100vh', width: '100%', background: 'black' } as const,
};

const meta = {
  component: WikiCard,
} satisfies Meta<typeof WikiCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div {...fullScreenWrapper}>
      <WikiCard article={mockArticle} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole('heading', { name: /eiffel tower/i })
    ).toBeVisible();
    await expect(canvas.getByText(/wrought-iron lattice tower/i)).toBeVisible();
    await expect(
      canvas.getByRole('button', { name: /like article/i })
    ).toBeVisible();
    await expect(
      canvas.getByRole('button', { name: /share article/i })
    ).toBeVisible();
    await expect(canvas.getByText(/read more/i)).toBeVisible();
  },
};

export const NoThumbnail: Story = {
  render: () => (
    <div {...fullScreenWrapper}>
      <WikiCard
        article={{ ...mockArticle, thumbnail: null } as unknown as WikiArticle}
      />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole('heading', { name: /eiffel tower/i })
    ).toBeVisible();
    await expect(canvas.getByText(/wrought-iron lattice tower/i)).toBeVisible();
    await expect(canvas.queryByRole('img')).not.toBeInTheDocument();
  },
};

export const Liked: Story = {
  render: () => (
    <div {...fullScreenWrapper}>
      <WikiCard article={mockArticle} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const likeButton = canvas.getByRole('button', { name: /like article/i });
    await expect(likeButton).not.toHaveClass('bg-red-500');
    await userEvent.click(likeButton);
    await expect(likeButton).toHaveClass('bg-red-500');
  },
};
