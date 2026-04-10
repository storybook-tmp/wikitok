import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import '../styles/Article.css';
import Article from './Article';

const meta = {
  component: Article,
  render: (args) => <Article {...args} />,
} satisfies Meta<typeof Article>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Aurora',
    content:
      'Auroras appear when solar particles collide with gases in the Earth’s atmosphere.',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('article')).toBeVisible();
    await expect(canvas.getByRole('heading', { name: /aurora/i })).toBeVisible();
    await expect(canvas.getByLabelText(/article content/i)).toHaveTextContent(
      /solar particles/i,
    );
  },
};

export const WithImage: Story = {
  args: {
    title: 'Volcano',
    content:
      'Volcanoes can create new landforms and reshape ecosystems through eruptions and lava flows.',
    image: '/wiki-logo.svg',
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('img', { name: /illustration for article: volcano/i }),
    ).toBeVisible();
    await expect(canvas.getByRole('heading', { name: /volcano/i })).toBeVisible();
  },
};

export const LongContent: Story = {
  args: {
    title: 'Mangrove Forests',
    content:
      'Mangrove forests grow in intertidal zones, shelter juvenile fish, store carbon, and reduce shoreline erosion during storms.',
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('heading', { name: /mangrove forests/i }),
    ).toBeVisible();
    await expect(canvas.getByLabelText(/article content/i)).toHaveTextContent(
      /shoreline erosion/i,
    );
  },
};
