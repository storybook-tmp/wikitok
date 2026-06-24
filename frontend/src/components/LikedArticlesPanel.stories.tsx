import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Search, X, Download } from 'lucide-react';
import type { WikiArticle } from './WikiCard';

const sampleLikedArticles: WikiArticle[] = [
  {
    title: 'Quantum Computing',
    displaytitle: 'Quantum Computing',
    extract: 'Quantum computing is a type of computation that harnesses quantum mechanical phenomena such as superposition and entanglement.',
    pageid: 1001,
    url: 'https://en.wikipedia.org/wiki/Quantum_computing',
    thumbnail: {
      source: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Qbit-model.png/800px-Qbit-model.png',
      width: 800,
      height: 600,
    },
  },
  {
    title: 'Machine Learning',
    displaytitle: 'Machine Learning',
    extract: 'Machine learning is a subset of artificial intelligence that provides systems the ability to learn and improve from experience.',
    pageid: 1002,
    url: 'https://en.wikipedia.org/wiki/Machine_learning',
    thumbnail: {
      source: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Kernel_Machine.svg/800px-Kernel_Machine.svg.png',
      width: 800,
      height: 600,
    },
  },
  {
    title: 'Neural Networks',
    displaytitle: 'Neural Networks',
    extract: 'A neural network is a network of artificial neurons that tries to mimic the structure and function of the human brain.',
    pageid: 1003,
    url: 'https://en.wikipedia.org/wiki/Neural_network',
    thumbnail: {
      source: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Artificial_neural_network.svg/800px-Artificial_neural_network.svg.png',
      width: 800,
      height: 600,
    },
  },
];

function LikedArticlesPanel({
  articles = sampleLikedArticles,
  onClose,
}: {
  articles?: WikiArticle[];
  onClose?: () => void;
}) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.extract.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-gray-900 p-6 rounded-lg w-full max-w-2xl h-[80vh] flex flex-col relative text-white">
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white/70 hover:text-white"
        >
          ✕
        </button>
      )}

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Liked Articles</h2>
        {articles.length > 0 && (
          <button className="flex items-center gap-2 px-3 py-1.5 text-sm bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
            <Download className="w-4 h-4" />
            Export
          </button>
        )}
      </div>

      <div className="relative mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search liked articles..."
          className="w-full bg-gray-800 text-white px-4 py-2 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Search className="w-5 h-5 text-white/50 absolute left-3 top-1/2 transform -translate-y-1/2" />
      </div>

      <div className="flex-1 overflow-y-auto min-h-0">
        {filteredArticles.length === 0 ? (
          <p className="text-white/70">
            {searchQuery ? 'No matches found.' : 'No liked articles yet.'}
          </p>
        ) : (
          <div className="space-y-4">
            {filteredArticles.map((article) => (
              <div key={article.pageid} className="flex gap-4 items-start group">
                {article.thumbnail && (
                  <img
                    src={article.thumbnail.source}
                    alt={article.title}
                    className="w-20 h-20 object-cover rounded"
                  />
                )}
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <span className="font-bold hover:text-gray-200">{article.title}</span>
                    <button className="text-white/50 hover:text-white/90 p-1 rounded-full">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-sm text-white/70 line-clamp-2">{article.extract}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const meta = {
  title: 'AI Generated/Complex/LikedArticlesPanel',
  component: LikedArticlesPanel,
  decorators: [
    (Story) => (
      <div className="bg-black min-h-screen flex items-center justify-center p-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof LikedArticlesPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithArticles: Story = {
  args: {
    articles: sampleLikedArticles,
  },
};

export const Empty: Story = {
  args: {
    articles: [],
  },
};
