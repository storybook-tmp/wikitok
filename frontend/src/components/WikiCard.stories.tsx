import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { WikiCard } from './WikiCard';
import type { WikiArticle } from './WikiCard';

const mockArticle: WikiArticle = {
  pageid: 1001,
  title: 'Quantum mechanics',
  displaytitle: 'Quantum mechanics',
  extract:
    'Quantum mechanics is a fundamental theory in physics that provides a description of the physical properties of nature at the scale of atoms and subatomic particles. It is the foundation of all quantum physics.',
  url: 'https://en.wikipedia.org/wiki/Quantum_mechanics',
  thumbnail: {
    source:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Solvay_conference_1927.jpg/800px-Solvay_conference_1927.jpg',
    width: 800,
    height: 600,
  },
};

const mockArticleNoImage: WikiArticle = {
  pageid: 1002,
  title: 'Philosophy of mind',
  displaytitle: 'Philosophy of mind',
  extract:
    'Philosophy of mind is a branch of philosophy that studies the ontology and nature of the mind and its relationship with the body.',
  url: 'https://en.wikipedia.org/wiki/Philosophy_of_mind',
  thumbnail: null as unknown as WikiArticle['thumbnail'],
};

const mockLikedArticle: WikiArticle = {
  pageid: 1003,
  title: 'Mount Everest',
  displaytitle: 'Mount Everest',
  extract:
    "Mount Everest is Earth's highest mountain above sea level, located in the Mahalangur Himal sub-range of the Himalayas. The China–Nepal border runs across its summit point.",
  url: 'https://en.wikipedia.org/wiki/Mount_Everest',
  thumbnail: {
    source:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Everest_North_Face_toward_Base_Camp_Tibet_Luca_Galuzzi_2006.jpg/800px-Everest_North_Face_toward_Base_Camp_Tibet_Luca_Galuzzi_2006.jpg',
    width: 800,
    height: 574,
  },
};

const meta = {
  component: WikiCard,
} satisfies Meta<typeof WikiCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <WikiCard article={mockArticle} />,
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Quantum mechanics')).toBeVisible();
    await expect(canvas.getByRole('button', { name: /like article/i })).toBeVisible();
    await expect(canvas.getByRole('button', { name: /share article/i })).toBeVisible();
    await expect(canvas.getByText(/read more/i)).toBeVisible();
  },
};

export const NoImage: Story = {
  render: () => <WikiCard article={mockArticleNoImage} />,
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Philosophy of mind')).toBeVisible();
    await expect(canvas.getByText(/philosophy of mind is a branch/i)).toBeVisible();
  },
};

export const Liked: Story = {
  render: () => <WikiCard article={mockLikedArticle} />,
  async beforeEach() {
    localStorage.setItem(
      'likedArticles',
      JSON.stringify([mockLikedArticle])
    );
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Mount Everest')).toBeVisible();
    const likeButton = canvas.getByRole('button', { name: /like article/i });
    await expect(likeButton).toBeVisible();
    // The button should have the red liked state
    await expect(likeButton).toHaveClass('bg-red-500');
  },
};
