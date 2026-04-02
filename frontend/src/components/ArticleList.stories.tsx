import type { Meta, StoryObj } from '@storybook/react-vite';
import ArticleList from './ArticleList';

const meta = {
  title: 'AI Generated/Medium/ArticleList',
  component: ArticleList,
} satisfies Meta<typeof ArticleList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    articles: [
      {
        id: 1,
        title: 'Introduction to Quantum Physics',
        content: 'Quantum physics is the study of matter and energy at the most fundamental level.',
      },
      {
        id: 2,
        title: 'The Art of Japanese Calligraphy',
        content: 'Japanese calligraphy, or shodō, is a traditional art form that emphasizes the beauty of writing.',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/East_Asian_calligraphy_scheme_02-en.svg/640px-East_Asian_calligraphy_scheme_02-en.svg.png',
      },
      {
        id: 3,
        title: 'Deep Sea Exploration',
        content: 'The deep ocean remains one of the least explored places on Earth, with new species discovered every year.',
      },
    ],
  },
};

export const Empty: Story = {
  args: {
    articles: [],
  },
};
