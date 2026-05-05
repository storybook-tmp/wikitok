import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import ArticleList from './ArticleList';
import '../styles/Article.css';

const meta = {
  component: ArticleList,
  tags: ['ai-generated'],
} satisfies Meta<typeof ArticleList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    articles: [
      {
        id: 1,
        title: 'Aurora Borealis',
        content: 'A natural light display in the sky seen in high-latitude regions.',
      },
      {
        id: 2,
        title: 'Cephalopod Intelligence',
        content:
          'Cephalopods are considered the most intelligent invertebrates.',
      },
      {
        id: 3,
        title: 'Voyager Golden Record',
        content:
          'Phonograph records included aboard both Voyager spacecraft launched in 1977.',
      },
    ],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Aurora Borealis')).toBeVisible();
    await expect(canvas.getByText('Cephalopod Intelligence')).toBeVisible();
    await expect(canvas.getByText('Voyager Golden Record')).toBeVisible();
  },
};

export const SingleArticle: Story = {
  args: {
    articles: [
      {
        id: 1,
        title: 'Quantum Computing',
        content:
          'Quantum computing harnesses quantum mechanics to solve problems faster than classical computers.',
      },
    ],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Quantum Computing')).toBeVisible();
    await expect(canvas.getByText(/quantum mechanics/i)).toBeVisible();
  },
};

export const WithImages: Story = {
  args: {
    articles: [
      {
        id: 1,
        title: 'Northern Lights',
        content: 'Beautiful light displays in the polar sky.',
        image: 'https://placehold.co/400x300/1a1a2e/ffffff?text=Lights',
      },
      {
        id: 2,
        title: 'Coral Reef',
        content: 'Underwater ecosystems formed by colonies of coral polyps.',
        image: 'https://placehold.co/400x300/2e1a1a/ffffff?text=Reef',
      },
    ],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Northern Lights')).toBeVisible();
    await expect(canvas.getByText('Coral Reef')).toBeVisible();
    await expect(
      canvas.getByAltText(/illustration for article: northern lights/i)
    ).toBeVisible();
  },
};
