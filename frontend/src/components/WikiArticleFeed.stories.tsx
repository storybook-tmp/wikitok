import type { Meta, StoryObj } from '@storybook/react-vite';
import { WikiCard } from './WikiCard';
import type { WikiArticle } from './WikiCard';

const mockArticles: WikiArticle[] = [
  {
    title: 'Deep Sea Exploration',
    displaytitle: 'Deep Sea Exploration',
    extract:
      'Deep-sea exploration is the investigation of physical, chemical, and biological conditions on the sea bed, for scientific or commercial purposes. It involves the study of the deep ocean floor.',
    pageid: 2001,
    url: 'https://en.wikipedia.org/wiki/Deep-sea_exploration',
    thumbnail: {
      source:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Bathyscaphe_Trieste.jpg/800px-Bathyscaphe_Trieste.jpg',
      width: 800,
      height: 600,
    },
  },
  {
    title: 'Space Telescope',
    displaytitle: 'Space Telescope',
    extract:
      'A space telescope is a telescope in outer space used to observe astronomical objects. Suggested in 1923, space telescopes avoid the filtering and distortion of electromagnetic radiation which occurs in the atmosphere.',
    pageid: 2002,
    url: 'https://en.wikipedia.org/wiki/Space_telescope',
    thumbnail: {
      source:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/HST-SM4.jpeg/800px-HST-SM4.jpeg',
      width: 800,
      height: 600,
    },
  },
  {
    title: 'Bioluminescence',
    displaytitle: 'Bioluminescence',
    extract:
      'Bioluminescence is the production and emission of light by a living organism. It is a form of chemiluminescence. Bioluminescence occurs widely in marine vertebrates and invertebrates.',
    pageid: 2003,
    url: 'https://en.wikipedia.org/wiki/Bioluminescence',
    thumbnail: {
      source:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Aequorea_victoria_green_fluorescent.jpg/800px-Aequorea_victoria_green_fluorescent.jpg',
      width: 800,
      height: 600,
    },
  },
];

function WikiArticleFeed({ articles }: { articles: WikiArticle[] }) {
  return (
    <div className="h-screen w-full bg-black text-white overflow-y-scroll snap-y snap-mandatory hide-scroll">
      {articles.map((article) => (
        <WikiCard key={article.pageid} article={article} />
      ))}
    </div>
  );
}

const meta = {
  title: 'AI Generated/Complex/WikiArticleFeed',
  component: WikiArticleFeed,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof WikiArticleFeed>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    articles: mockArticles,
  },
};

export const SingleArticle: Story = {
  args: {
    articles: [mockArticles[0]],
  },
};
