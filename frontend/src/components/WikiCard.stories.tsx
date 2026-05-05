import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';
import { WikiCard } from './WikiCard';
import type { WikiArticle } from './WikiCard';

const mockArticle: WikiArticle = {
  title: 'Quantum Mechanics',
  displaytitle: 'Quantum Mechanics',
  extract:
    'Quantum mechanics is a fundamental theory in physics that describes the behavior of nature at and below the scale of atoms. It is the foundation of all quantum physics.',
  pageid: 1001,
  url: 'https://en.wikipedia.org/wiki/Quantum_mechanics',
  thumbnail: {
    source:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Hydrogen_Density_Plots.png/800px-Hydrogen_Density_Plots.png',
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
    await expect(
      canvas.getByRole('heading', { name: /quantum mechanics/i }),
    ).toBeVisible();
    await expect(canvas.getByText(/read more/i)).toBeVisible();
    await expect(
      canvas.getByRole('button', { name: /like article/i }),
    ).toBeVisible();
    await expect(
      canvas.getByRole('button', { name: /share article/i }),
    ).toBeVisible();
  },
};

export const WithLongExtract: Story = {
  args: {
    article: {
      ...mockArticle,
      pageid: 2002,
      title: 'History of the Roman Empire',
      displaytitle: 'History of the Roman Empire',
      extract:
        'The Roman Empire was the post-Republican state of ancient Rome. It included large territorial holdings around the Mediterranean Sea in Europe, Northern Africa, and Western Asia, and was ruled by emperors. From the accession of Caesar Augustus as the first Roman emperor to the military anarchy of the third century, it was a principate with Italy as the metropole of its provinces and the city of Rome as its sole capital.',
    },
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('heading', { name: /roman empire/i }),
    ).toBeVisible();
    await expect(canvas.getByText(/post-republican state/i)).toBeVisible();
  },
};

export const LikeInteraction: Story = {
  args: {
    article: {
      ...mockArticle,
      pageid: 3003,
      title: 'Aurora Borealis',
      displaytitle: 'Aurora Borealis',
    },
  },
  play: async ({ canvas, userEvent }) => {
    const likeButton = canvas.getByRole('button', { name: /like article/i });
    await expect(likeButton).toBeVisible();
    await userEvent.click(likeButton);
    await waitFor(() => {
      expect(likeButton.className).toMatch(/bg-red-500/);
    });
  },
};

export const CssCheck: Story = {
  args: {
    article: mockArticle,
  },
  play: async () => {
    // The global index.css sets overscroll-behavior-y: contain on html/body
    // This is a non-default value that proves our CSS loaded
    const bodyStyle = getComputedStyle(document.body);
    await expect(bodyStyle.overscrollBehaviorY).toBe('contain');
  },
};
