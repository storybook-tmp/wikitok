import type { Meta, StoryObj } from '@storybook/react-vite';
import ArticleList from './ArticleList';
import '../styles/Article.css';

const mockArticles = [
  {
    id: 1,
    title: 'The Solar System',
    content:
      'The Solar System is the gravitationally bound system of the Sun and the objects that orbit it. The largest of such objects are the eight planets.',
    image: 'https://picsum.photos/seed/solar/600/400',
  },
  {
    id: 2,
    title: 'Deep Sea Creatures',
    content:
      'The deep sea is the lowest layer in the ocean, existing below the thermocline, at a depth of 1800m or more. Creatures living here have adapted to extreme conditions.',
    image: 'https://picsum.photos/seed/deepsea/600/400',
  },
  {
    id: 3,
    title: 'Ancient Rome',
    content:
      'Ancient Rome refers to the civilization centered on the city of Rome in modern-day Italy. It grew from a small town on the Tiber River into an empire that encompassed much of continental Europe.',
  },
];

const meta = {
  component: ArticleList,
} satisfies Meta<typeof ArticleList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <ArticleList articles={mockArticles} />,
};

export const SingleArticle: Story = {
  render: () => <ArticleList articles={[mockArticles[0]]} />,
};

export const ManyArticles: Story = {
  render: () => (
    <ArticleList
      articles={[
        ...mockArticles,
        {
          id: 4,
          title: 'The Renaissance',
          content:
            'The Renaissance was a period in European history marking the transition from the Middle Ages to modernity, covering the 15th and 16th centuries.',
          image: 'https://picsum.photos/seed/renaissance/600/400',
        },
        {
          id: 5,
          title: 'Artificial Intelligence',
          content:
            'Artificial intelligence is the simulation of human intelligence processes by computer systems, including learning, reasoning, and self-correction.',
        },
      ]}
    />
  ),
};
