import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import ArticleList from './ArticleList';

const meta = {
  component: ArticleList,
  tags: ['ai-generated'],
} satisfies Meta<typeof ArticleList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    articles: [
      { id: 1, title: 'Solar System', content: 'The Solar System is the gravitationally bound system of the Sun and the objects that orbit it.' },
      { id: 2, title: 'Deep Ocean', content: 'The deep sea is the lowest layer in the ocean, existing below the thermocline.' },
      { id: 3, title: 'Rainforests', content: 'Rainforests are forests characterized by a closed and continuous tree canopy.' },
    ],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('navigation', { name: /articles navigation/i })).toBeVisible();
    await expect(canvas.getAllByRole('listitem')).toHaveLength(3);
  },
};

export const SingleArticle: Story = {
  args: {
    articles: [
      { id: 1, title: 'Astronomy', content: 'Astronomy is a natural science that studies celestial objects and phenomena.' },
    ],
  },
};

export const WithImages: Story = {
  args: {
    articles: [
      { id: 1, title: 'Volcanoes', content: 'A volcano is a rupture in the crust of a planetary-mass object.', image: 'https://placehold.co/400x300/900/white?text=Volcano' },
      { id: 2, title: 'Glaciers', content: 'A glacier is a persistent body of dense ice that is constantly moving under its own weight.', image: 'https://placehold.co/400x300/09c/white?text=Glacier' },
    ],
  },
};

export const Clickable: Story = {
  args: {
    articles: [
      { id: 1, title: 'Photosynthesis', content: 'Photosynthesis is a process used by plants to convert light into chemical energy.' },
    ],
    onArticleSelect: () => {},
  },
  play: async ({ canvas }) => {
    const item = canvas.getByRole('listitem');
    await expect(item).toHaveAttribute('aria-label', 'Article: Photosynthesis');
  },
};
