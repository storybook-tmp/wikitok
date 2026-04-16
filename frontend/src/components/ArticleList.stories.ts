import type { Meta, StoryObj } from '@storybook/react-vite';
import ArticleList from './ArticleList';
import { fn } from 'storybook/test';
import '../styles/Article.css';

const meta = {
  title: 'AI Generated/Medium/ArticleList',
  component: ArticleList,
  args: {
    onArticleSelect: fn(),
  },
} satisfies Meta<typeof ArticleList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    articles: [
      {
        id: 1,
        title: 'The Eiffel Tower',
        content:
          'The Eiffel Tower is a wrought-iron lattice tower on the Champ de Mars in Paris, France. It is named after the engineer Gustave Eiffel.',
      },
      {
        id: 2,
        title: 'Mount Fuji',
        content:
          'Mount Fuji is the highest mountain in Japan at 3,776 meters. It is an active stratovolcano that last erupted in 1707–1708.',
      },
      {
        id: 3,
        title: 'The Great Wall of China',
        content:
          'The Great Wall of China is a series of fortifications built across the historical northern borders of ancient Chinese states.',
      },
    ],
  },
};

export const WithImages: Story = {
  args: {
    articles: [
      {
        id: 1,
        title: 'Colosseum',
        content:
          'The Colosseum is an oval amphitheatre in the centre of Rome, Italy, built of travertine limestone, tuff, and brick-faced concrete.',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Colosseo_2020.jpg/640px-Colosseo_2020.jpg',
      },
      {
        id: 2,
        title: 'Taj Mahal',
        content:
          'The Taj Mahal is an ivory-white marble mausoleum on the right bank of the river Yamuna in Agra, India.',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Taj_Mahal_%28Edited%29.jpeg/640px-Taj_Mahal_%28Edited%29.jpeg',
      },
    ],
  },
};

export const Empty: Story = {
  args: {
    articles: [],
  },
};
