import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { articleStories } from '../../.storybook/story-fixtures';
import '../styles/Article.css';
import Article from './Article';

const meta = {
  component: Article,
} satisfies Meta<typeof Article>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Article {...articleStories[0]} />,
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('article', { name: /aurora forest/i }),
    ).toBeVisible();
    await expect(
      canvas.getByLabelText(/article content/i),
    ).toHaveTextContent(/encyclopedia-style entries/i);
  },
};

export const WithImage: Story = {
  render: () => <Article {...articleStories[1]} />,
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('img', {
        name: /illustration for article: glass archipelago/i,
      }),
    ).toBeVisible();
    await expect(
      canvas.getByRole('heading', { name: /glass archipelago/i }),
    ).toBeVisible();
  },
};

export const LongContent: Story = {
  render: () => <Article {...articleStories[2]} />,
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('heading', { name: /moonlit gardens/i }),
    ).toBeVisible();
    await expect(
      canvas.getByLabelText(/article content/i),
    ).toHaveTextContent(/longer states/i);
  },
};
