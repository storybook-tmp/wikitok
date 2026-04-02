import type { Meta, StoryObj } from '@storybook/react-vite';

import { WikiCard } from './WikiCard';
import {
  sampleWikiArticle,
  secondWikiArticle,
} from '../storybook/fixtures';

const meta = {
  title: 'AI Generated/Complex/WikiCard',
  component: WikiCard,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    article: sampleWikiArticle,
  },
} satisfies Meta<typeof WikiCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AlreadyLiked: Story = {
  args: {
    article: secondWikiArticle,
  },
  parameters: {
    likedArticles: [secondWikiArticle],
  },
};
