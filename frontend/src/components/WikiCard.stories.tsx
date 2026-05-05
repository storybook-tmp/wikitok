import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { WikiCard } from './WikiCard';
import type { WikiArticle } from './WikiCard';

const mockArticle: WikiArticle = {
  title: 'Quantum Mechanics',
  displaytitle: 'Quantum Mechanics',
  extract:
    'Quantum mechanics is a fundamental theory that describes the behavior of nature at and below the scale of atoms. It is the foundation of all quantum physics.',
  pageid: 12345,
  url: 'https://en.wikipedia.org/wiki/Quantum_mechanics',
  thumbnail: {
    source: 'https://placehold.co/800x600/1a1a2e/ffffff?text=Quantum+Mechanics',
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
  args: {
    article: mockArticle,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Quantum Mechanics')).toBeVisible();
    await expect(canvas.getByText(/fundamental theory/)).toBeVisible();
    await expect(canvas.getByText('Read more →')).toBeVisible();
  },
};

export const WithLikeButton: Story = {
  args: {
    article: mockArticle,
  },
  play: async ({ canvas, userEvent }) => {
    const likeButton = canvas.getByRole('button', { name: /like article/i });
    await expect(likeButton).toBeVisible();
    await userEvent.click(likeButton);
    await expect(likeButton).toBeVisible();
  },
};

export const LongExtract: Story = {
  args: {
    article: {
      ...mockArticle,
      pageid: 99999,
      title: 'History of the World',
      displaytitle: 'History of the World',
      extract:
        'The history of the world is the memory of the past experience of Homo sapiens sapiens around the world, as that experience has been preserved, largely in written records. By "prehistory", historians mean the recovery of knowledge of the past in an area where no written records exist, or where the writing of a culture is not understood. By studying painting, drawings, carvings, and other artifacts, some information can be recovered even in the absence of a written record. Since the 20th century, the study of prehistory is considered essential to avoid implicitly excluding certain civilizations.',
    },
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('History of the World')).toBeVisible();
    await expect(canvas.getByText(/memory of the past/)).toBeVisible();
  },
};

export const ShareButton: Story = {
  args: {
    article: mockArticle,
  },
  play: async ({ canvas }) => {
    const shareButton = canvas.getByRole('button', { name: /share article/i });
    await expect(shareButton).toBeVisible();
  },
};
