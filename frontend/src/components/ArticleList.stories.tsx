import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';
import type { ArticleProps } from '../types/ArticleProps';
import ArticleList from './ArticleList';

const sampleArticles: ArticleProps[] = [
  {
    id: 'aurora',
    title: 'Aurora over Alaska',
    content:
      'A ribbon of green light bends over Denali National Park while winter clouds lift off the mountain range.',
  },
  {
    id: 'rover',
    title: 'Mars Rover Workshop',
    content:
      'A volunteer-built robotics lab uses open-source rover designs to teach navigation, mapping, and planetary geology.',
  },
  {
    id: 'vents',
    title: 'Deep Sea Vent',
    content:
      'Hydrothermal vents on the ocean floor support dense ecosystems that thrive without sunlight and reshape nearby minerals.',
  },
];

const meta = {
  component: ArticleList,
  args: {
    articles: sampleArticles,
  },
} satisfies Meta<typeof ArticleList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('navigation', { name: /articles navigation/i })).toBeVisible();
    await expect(canvas.getAllByRole('listitem')).toHaveLength(3);
    await expect(canvas.getByText(/aurora over alaska/i)).toBeVisible();
  },
};

export const SelectsOnClick: Story = {
  args: {
    onArticleSelect: fn(),
  },
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('listitem', { name: /article: mars rover workshop/i }));

    await expect(args.onArticleSelect).toHaveBeenCalledTimes(1);
    await expect(args.onArticleSelect).toHaveBeenCalledWith(sampleArticles[1]);
  },
};

export const SelectsOnKeyboard: Story = {
  args: {
    onArticleSelect: fn(),
  },
  play: async ({ args, canvas, userEvent }) => {
    const firstItem = canvas.getByRole('listitem', { name: /article: aurora over alaska/i });

    firstItem.focus();
    await userEvent.keyboard('{Enter}');

    await expect(args.onArticleSelect).toHaveBeenCalledTimes(1);
    await expect(args.onArticleSelect).toHaveBeenCalledWith(sampleArticles[0]);
  },
};
