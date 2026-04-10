import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, fn } from 'storybook/test';
import ArticleList from './ArticleList';
import type { ArticleProps } from '../types/ArticleProps';

const sampleArticles: ArticleProps[] = [
  {
    title: 'Quantum mechanics',
    content:
      'Quantum mechanics is a fundamental theory in physics that describes nature at atomic and subatomic scales.',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Solvay_conference_1927.jpg/800px-Solvay_conference_1927.jpg',
  },
  {
    title: 'Great Wall of China',
    content:
      'The Great Wall of China is a series of fortifications built across the historical northern borders of ancient Chinese states.',
  },
  {
    title: 'Mount Everest',
    content:
      "Mount Everest is Earth's highest mountain above sea level, located in the Mahalangur Himal sub-range of the Himalayas.",
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Everest_North_Face_toward_Base_Camp_Tibet_Luca_Galuzzi_2006.jpg/800px-Everest_North_Face_toward_Base_Camp_Tibet_Luca_Galuzzi_2006.jpg',
  },
];

const meta = {
  component: ArticleList,
} satisfies Meta<typeof ArticleList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <ArticleList articles={sampleArticles} />,
  play: async ({ canvas }) => {
    const nav = canvas.getByRole('navigation', { name: /articles navigation/i });
    await expect(nav).toBeVisible();
    await expect(canvas.getByText('Quantum mechanics')).toBeVisible();
    await expect(canvas.getByText('Great Wall of China')).toBeVisible();
    await expect(canvas.getByText('Mount Everest')).toBeVisible();
  },
};

export const Empty: Story = {
  render: () => <ArticleList articles={[]} />,
  play: async ({ canvas }) => {
    const nav = canvas.getByRole('navigation', { name: /articles navigation/i });
    await expect(nav).toBeVisible();
    const list = canvas.getByRole('list');
    await expect(list).toBeVisible();
  },
};

export const WithSelection: Story = {
  render: () => {
    const onSelect = fn();
    return <ArticleList articles={sampleArticles} onArticleSelect={onSelect} />;
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Quantum mechanics')).toBeVisible();
    const listItems = canvas.getAllByRole('listitem');
    await expect(listItems).toHaveLength(3);
    await userEvent.click(listItems[0]);
  },
};
