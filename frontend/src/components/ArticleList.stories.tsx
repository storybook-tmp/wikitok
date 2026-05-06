import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';
import ArticleList from './ArticleList';

const sampleArticles = [
  {
    title: 'The History of the Internet',
    content: 'The Internet developed from the ARPANET, which was funded by the US government.',
  },
  {
    title: 'Space Exploration',
    content: 'Space exploration is the use of astronomy and space technology to explore outer space.',
    image: 'https://placehold.co/600x400/1a1a2e/ffffff?text=Space',
  },
  {
    title: 'Quantum Physics',
    content: 'Quantum physics is the study of matter and energy at the most fundamental level.',
  },
];

const meta = {
  component: ArticleList,
  tags: ['ai-generated'],
  args: {
    articles: sampleArticles,
  },
} satisfies Meta<typeof ArticleList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    const items = canvas.getAllByRole('listitem');
    await expect(items).toHaveLength(3);
  },
};

export const WithSelection: Story = {
  args: {
    onArticleSelect: fn(),
  },
  play: async ({ canvas, userEvent, args }) => {
    const firstItem = canvas.getAllByRole('listitem')[0];
    await userEvent.click(firstItem);
    await expect(args.onArticleSelect).toHaveBeenCalledOnce();
  },
};

export const Empty: Story = {
  args: {
    articles: [],
  },
};
