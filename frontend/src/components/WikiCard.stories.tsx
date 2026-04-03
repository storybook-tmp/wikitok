import type { Meta, StoryObj } from '@storybook/react-vite';
import { WikiCard } from './WikiCard';
import {
  mockFeedArticles,
  mockLikedArticles,
} from '../../.storybook/wiki-mocks';

const meta = {
  component: WikiCard,
} satisfies Meta<typeof WikiCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <WikiCard article={mockFeedArticles[0]} />,
};

export const Liked: Story = {
  render: () => <WikiCard article={mockLikedArticles[0]} />,
};
