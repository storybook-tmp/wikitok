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
    title: 'The History of Computing',
    content:
      'Computing has evolved from mechanical calculators to modern supercomputers. The journey began with Charles Babbage\'s Analytical Engine and has led to the powerful devices we use today.',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('article')).toBeVisible();
    await expect(canvas.getByText('The History of Computing')).toBeVisible();
    await expect(canvas.getByText(/Computing has evolved/)).toBeVisible();
  },
};

export const WithImage: Story = {
  args: {
    title: 'Aurora Borealis',
    content:
      'An aurora is a natural light display in Earth\'s sky, predominantly seen in high-latitude regions around the Arctic and Antarctic.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Polarlicht_2.jpg/800px-Polarlicht_2.jpg',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('article')).toBeVisible();
    await expect(canvas.getByText('Aurora Borealis')).toBeVisible();
    await expect(
      canvas.getByAltText('Illustration for article: Aurora Borealis'),
    ).toBeVisible();
  },
};

export const CssCheck: Story = {
  args: {
    title: 'Style Verification',
    content: 'This story verifies that Article.css styles are loaded correctly.',
  },
  play: async ({ canvas }) => {
    const content = canvas.getByText(/This story verifies/);
    // line-height: 1.6 from Article.css computes to a px value at the rendered font size
    await expect(getComputedStyle(content).lineHeight).toBe('24px');
  },
};
