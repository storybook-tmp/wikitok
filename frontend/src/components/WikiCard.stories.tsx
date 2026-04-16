import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent } from 'storybook/test';
import { WikiCard } from './WikiCard';
import type { WikiArticle } from './WikiCard';

const meta = {
  component: WikiCard,
} satisfies Meta<typeof WikiCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const einsteinArticle: WikiArticle = {
  pageid: 736,
  title: 'Albert Einstein',
  displaytitle: 'Albert Einstein',
  extract:
    'Albert Einstein was a German-born theoretical physicist who is widely held to be one of the greatest and most influential scientists of all time. Best known for developing the theory of relativity.',
  thumbnail: {
    source:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Albert_Einstein_Head.jpg/800px-Albert_Einstein_Head.jpg',
    width: 800,
    height: 1000,
  },
  url: 'https://en.wikipedia.org/wiki/Albert_Einstein',
};

const everestArticle: WikiArticle = {
  pageid: 18599,
  title: 'Mount Everest',
  displaytitle: 'Mount Everest',
  extract:
    "Mount Everest is Earth's highest mountain above sea level, located in the Mahalangur Himal sub-range of the Himalayas.",
  thumbnail: {
    source:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Everest_North_Face_toward_Base_Camp_Tibet_Luca_Galuzzi_2006.jpg/800px-Everest_North_Face_toward_Base_Camp_Tibet_Luca_Galuzzi_2006.jpg',
    width: 800,
    height: 600,
  },
  url: 'https://en.wikipedia.org/wiki/Mount_Everest',
};

const noThumbnailArticle: WikiArticle = {
  pageid: 99999,
  title: 'Text Only Article',
  displaytitle: 'Text Only Article',
  extract:
    'This is an article without a thumbnail image. It should render a gray background instead.',
  thumbnail: {
    source: '',
    width: 0,
    height: 0,
  },
  url: 'https://en.wikipedia.org/wiki/Text_Only_Article',
};

export const Default: Story = {
  render: () => (
    <div style={{ height: '800px', width: '100%', backgroundColor: 'black', color: 'white', position: 'relative' }}>
      <WikiCard article={einsteinArticle} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Albert Einstein')).toBeVisible();
    await expect(canvas.getByText(/German-born theoretical physicist/i)).toBeVisible();
    await expect(canvas.getByRole('button', { name: /like article/i })).toBeVisible();
    await expect(canvas.getByRole('button', { name: /share article/i })).toBeVisible();
    await expect(canvas.getByRole('link', { name: /read more/i })).toBeVisible();
  },
};

export const Liked: Story = {
  render: () => (
    <div style={{ height: '800px', width: '100%', backgroundColor: 'black', color: 'white', position: 'relative' }}>
      <WikiCard article={everestArticle} />
    </div>
  ),
  async beforeEach() {
    localStorage.setItem('likedArticles', JSON.stringify([everestArticle]));
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Mount Everest')).toBeVisible();
    const likeButton = canvas.getByRole('button', { name: /like article/i });
    await expect(likeButton).toBeVisible();
    await expect(likeButton).toHaveClass('bg-red-500');
  },
};

export const LikeInteraction: Story = {
  render: () => (
    <div style={{ height: '800px', width: '100%', backgroundColor: 'black', color: 'white', position: 'relative' }}>
      <WikiCard article={einsteinArticle} />
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
