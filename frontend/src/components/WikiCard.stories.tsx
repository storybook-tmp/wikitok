import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { WikiCard } from './WikiCard';
import type { WikiArticle } from './WikiCard';

const mockArticle: WikiArticle = {
  pageid: 1001,
  title: 'Aurora Borealis',
  displaytitle: 'Aurora Borealis',
  extract:
    'An aurora, also commonly known as the northern lights or southern lights, is a natural light display in Earth\'s sky, predominantly seen in high-latitude regions. Auroras display dynamic patterns of brilliant lights that appear as curtains, rays, spirals, or dynamic flickers covering the entire sky.',
  url: 'https://en.wikipedia.org/wiki/Aurora_Borealis',
  thumbnail: {
    source: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Polarlicht_2.jpg/800px-Polarlicht_2.jpg',
    width: 800,
    height: 600,
  },
};

const mockArticleNoThumbnail: WikiArticle = {
  pageid: 1004,
  title: 'Quantum Computing',
  displaytitle: 'Quantum Computing',
  extract:
    'Quantum computing is a type of computation that harnesses the collective properties of quantum states, such as superposition, interference, and entanglement, to perform calculations.',
  url: 'https://en.wikipedia.org/wiki/Quantum_Computing',
  thumbnail: undefined as unknown as WikiArticle['thumbnail'],
};

const meta = {
  component: WikiCard,
  tags: ['ai-generated'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof WikiCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    article: mockArticle,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Aurora Borealis')).toBeVisible();
    await expect(canvas.getByText(/natural light display/)).toBeVisible();
    await expect(canvas.getByText('Read more →')).toBeVisible();
    await expect(canvas.getByLabelText('Like article')).toBeVisible();
    await expect(canvas.getByLabelText('Share article')).toBeVisible();
  },
};

export const WithLike: Story = {
  args: {
    article: mockArticle,
  },
  play: async ({ canvas, userEvent }) => {
    const likeButton = canvas.getByLabelText('Like article');
    await userEvent.click(likeButton);
    // After liking, the button should have the red background class
    await expect(likeButton.className).toContain('bg-red-500');
  },
};

export const CssCheck: Story = {
  args: {
    article: mockArticle,
  },
  play: async ({ canvas }) => {
    const readMoreLink = canvas.getByText('Read more →');
    // The content overlay div uses `flex` from Tailwind — without Tailwind,
    // a div's default display is 'block'. This proves Tailwind CSS is loaded.
    const contentWrapper = readMoreLink.closest('.flex');
    await expect(contentWrapper).not.toBeNull();
    await expect(getComputedStyle(contentWrapper!).display).toBe('flex');
  },
};

export const NoThumbnail: Story = {
  args: {
    article: mockArticleNoThumbnail,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Quantum Computing')).toBeVisible();
    await expect(canvas.getByText(/harnesses the collective properties/)).toBeVisible();
    // No image should be rendered
    const images = canvas.queryAllByRole('img');
    await expect(images).toHaveLength(0);
  },
};
