import type { Meta, StoryObj } from '@storybook/react-vite';
import { featuredArticle } from '../../.storybook/wikiFixtures';
import { WikiCard } from './WikiCard';

const meta = {
  component: WikiCard,
} satisfies Meta<typeof WikiCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="h-screen w-full bg-black text-white overflow-y-scroll snap-y snap-mandatory hide-scroll">
      <WikiCard article={featuredArticle} />
    </div>
  ),
};
