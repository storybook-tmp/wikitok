import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent } from 'storybook/test';
import ArticleList from './ArticleList';

const meta = {
  component: ArticleList,
} satisfies Meta<typeof ArticleList>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleArticles = [
  {
    id: 1,
    title: 'Albert Einstein',
    content:
      'Albert Einstein was a German-born theoretical physicist who is widely held to be one of the greatest and most influential scientists of all time.',
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
    title: 'Eiffel Tower',
    content:
      'The Eiffel Tower is a wrought-iron lattice tower on the Champ de Mars in Paris, France.',
  },
];

export const Default: Story = {
  render: () => <ArticleList articles={sampleArticles} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('navigation', { name: /Articles navigation/i })).toBeVisible();
    await expect(canvas.getByText('Albert Einstein')).toBeVisible();
    await expect(canvas.getByText('Mount Everest')).toBeVisible();
    await expect(canvas.getByText('Eiffel Tower')).toBeVisible();
  },
};

export const SingleArticle: Story = {
  render: () => (
    <ArticleList
      articles={[
        {
          id: 1,
          title: 'Albert Einstein',
          content:
            'Albert Einstein was a German-born theoretical physicist who developed the theory of relativity.',
        },
      ]}
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('navigation', { name: /Articles navigation/i })).toBeVisible();
    await expect(canvas.getByText('Albert Einstein')).toBeVisible();
    const items = canvas.getAllByRole('listitem');
    await expect(items).toHaveLength(1);
  },
};

export const WithOnSelect: Story = {
  render: () => {
    const handleSelect = (article: { title: string }) => {
      console.log('Selected:', article.title);
    };
    return <ArticleList articles={sampleArticles} onArticleSelect={handleSelect} />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Albert Einstein')).toBeVisible();
    const firstItem = canvas.getAllByRole('listitem')[0];
    await userEvent.click(firstItem);
    await expect(firstItem).toBeVisible();
  },
};
