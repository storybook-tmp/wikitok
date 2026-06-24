import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import App from './App';
import { likedArticlesSeed } from '../.storybook/mockWikiData';

const meta = {
  component: App,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof App>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <App />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const headings = await canvas.findAllByRole('heading', { level: 2 });
    expect(headings.length).toBeGreaterThan(0);
  },
};

export const Likes: Story = {
  render: () => <App />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Likes' }));
    await canvas.findByPlaceholderText('Search liked articles...');
    const likedArticleTitles = await canvas.findAllByText(likedArticlesSeed[0].title);
    expect(likedArticleTitles.length).toBeGreaterThan(0);
  },
};
