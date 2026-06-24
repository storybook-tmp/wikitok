import type { Meta, StoryObj } from '@storybook/react-vite';
import { within } from 'storybook/test';
import { featuredArticle } from '../.storybook/wikiFixtures';
import App from './App';

const meta = {
  component: App,
} satisfies Meta<typeof App>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <App />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await canvas.findByRole('link', { name: featuredArticle.displaytitle });
  },
};
