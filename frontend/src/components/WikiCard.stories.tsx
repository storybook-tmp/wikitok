import type { Meta, StoryObj } from '@storybook/react-vite';
import { defaultLikedArticles, defaultWikiArticles } from '../../.storybook/wikiMockData';
import { WikiCard } from './WikiCard';

const meta = {
  component: WikiCard,
} satisfies Meta<typeof WikiCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <WikiCard article={defaultWikiArticles[0]} />,
};

export const Liked: Story = {
  render: () => <WikiCard article={defaultLikedArticles[0]} />,
};
