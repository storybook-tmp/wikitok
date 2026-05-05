import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import Article from './Article';
import '../styles/Article.css';

const meta = {
  component: Article,
  tags: ['ai-generated'],
} satisfies Meta<typeof Article>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Aurora Borealis',
    content:
      'An aurora borealis is a natural light display in the sky, predominantly seen in high-latitude regions.',
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('heading', { name: /aurora borealis/i })
    ).toBeVisible();
    await expect(canvas.getByText(/natural light display/i)).toBeVisible();
  },
};

export const WithImage: Story = {
  args: {
    title: 'Voyager Golden Record',
    content:
      'The Voyager Golden Records are two phonograph records included aboard both Voyager spacecraft launched in 1977.',
    image: 'https://placehold.co/400x300/1a2e1a/ffffff?text=Voyager',
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('heading', { name: /voyager golden record/i })
    ).toBeVisible();
    await expect(
      canvas.getByAltText(/illustration for article: voyager golden record/i)
    ).toBeVisible();
  },
};

export const LongContent: Story = {
  args: {
    title: 'Deep Sea Exploration',
    content:
      'Deep-sea exploration is the investigation of physical, chemical, and biological conditions on the sea bed for scientific or commercial purposes. It covers a vast range of topics including ocean floor geology, deep-sea organisms, and the effects of human activities on the deep ocean environment. Advances in technology have enabled researchers to explore the deepest parts of the ocean.',
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('heading', { name: /deep sea exploration/i })
    ).toBeVisible();
    await expect(canvas.getByText(/investigation of physical/i)).toBeVisible();
  },
};

export const CssCheck: Story = {
  args: {
    title: 'CSS Verification',
    content: 'This verifies that Article.css styles are loaded correctly.',
  },
  play: async ({ canvas }) => {
    const contentEl = canvas.getByText(/verifies that article\.css/i);
    // Article.css sets .article-content { line-height: 1.6 } — fails if CSS did not load.
    await expect(getComputedStyle(contentEl).lineHeight).toBe('25.6px');
  },
};
