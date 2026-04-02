import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import ArticleList from './ArticleList';

const meta = {
  title: 'AI Generated/Medium/ArticleList',
  component: ArticleList,
} satisfies Meta<typeof ArticleList>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleArticles = [
  {
    id: 1,
    title: 'The History of the Internet',
    content:
      'The Internet is a global system of interconnected computer networks that uses the Internet protocol suite to communicate between networks and devices.',
  },
  {
    id: 2,
    title: 'Mount Everest',
    content:
      "Mount Everest is Earth's highest mountain above sea level, located in the Mahalangur Himal sub-range of the Himalayas.",
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Everest_North_Face_toward_Base_Camp_Tibet_Luca_Galuzzi_2006.jpg/800px-Everest_North_Face_toward_Base_Camp_Tibet_Luca_Galuzzi_2006.jpg',
  },
  {
    id: 3,
    title: 'Photosynthesis',
    content:
      'Photosynthesis is a process used by plants and other organisms to convert light energy into chemical energy.',
  },
];

export const Default: Story = {
  args: {
    articles: sampleArticles,
  },
};

export const WithSelection: Story = {
  args: {
    articles: sampleArticles,
    onArticleSelect: fn(),
  },
};
