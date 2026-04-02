import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import ArticleList from './ArticleList';

const meta = {
  title: 'AI Generated/Medium/ArticleList',
  component: ArticleList,
  parameters: {
    layout: 'centered',
  },
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
        title: 'The History of the Internet',
        content: 'The Internet is a global network of billions of computers and other electronic devices.',
      },
      {
        id: 2,
        title: 'Mount Everest',
        content: 'Mount Everest is Earth\'s highest mountain above sea level.',
      },
      {
        id: 3,
        title: 'Quantum Computing',
        content: 'Quantum computing is a type of computation that harnesses the collective properties of quantum states.',
      },
    ],
  },
};

export const WithImages: Story = {
  args: {
    articles: [
      {
        id: 1,
        title: 'Northern Lights',
        content: 'The aurora borealis, commonly known as the northern lights, is a natural light display in Earth\'s sky.',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Aurore_australe_2010.jpg/640px-Aurore_australe_2010.jpg',
      },
      {
        id: 2,
        title: 'The Great Wall of China',
        content: 'The Great Wall of China is a series of fortifications built across the historical northern borders of China.',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/The_Great_Wall_of_China_at_Jinshanling-edit.jpg/640px-The_Great_Wall_of_China_at_Jinshanling-edit.jpg',
      },
    ],
  },
};

export const Empty: Story = {
  args: {
    articles: [],
  },
};
