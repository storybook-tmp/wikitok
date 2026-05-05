import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import Article from './Article';

const meta = {
  component: Article,
  tags: ['ai-generated'],
} satisfies Meta<typeof Article>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'The Solar System',
    content:
      'The Solar System is the gravitationally bound system of the Sun and the objects that orbit it.',
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('heading', { name: /the solar system/i })
    ).toBeVisible();
  },
};

export const WithImage: Story = {
  args: {
    title: 'Aurora Borealis',
    content:
      'An aurora is a natural light display in Earth\'s sky, predominantly seen in high-latitude regions.',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Polarlicht_2.jpg/800px-Polarlicht_2.jpg',
  },
};

export const LongContent: Story = {
  args: {
    title: 'Deep Sea Exploration',
    content:
      'Deep-sea exploration is the investigation of physical, chemical, and biological conditions on the sea bed, for scientific or commercial purposes. Deep-sea exploration is considered a relatively recent human activity compared to the other areas of geophysical research, as the deep sea depths were not explored until more recent decades.',
  },
};

export const CssCheck: Story = {
  args: {
    title: 'CSS Test Article',
    content: 'Verifying that Article.css loaded correctly.',
  },
  play: async ({ canvasElement }) => {
    const container = canvasElement.querySelector('.article-container');
    // Article.css sets .article-container { padding: 1rem } = 16px
    await expect(getComputedStyle(container!).padding).toBe('16px');
  },
};
