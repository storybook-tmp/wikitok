import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';
import { WikiCard } from './WikiCard';
import type { WikiArticle } from './WikiCard';

const mockArticle: WikiArticle = {
  title: 'Aurora Borealis',
  displaytitle: 'Aurora Borealis',
  extract:
    "An aurora, also commonly known as the northern lights or southern lights, is a natural light display in Earth's sky, predominantly seen in high-latitude regions. Auroras display dynamic patterns of brilliant lights that appear as curtains, rays, spirals, or dynamic flickers covering the entire sky.",
  pageid: 101,
  url: 'https://en.wikipedia.org/wiki/Aurora_(astronomy)',
  thumbnail: {
    source:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Polarlicht_2.jpg/800px-Polarlicht_2.jpg',
    width: 800,
    height: 600,
  },
};

const mockArticleNoImage: WikiArticle = {
  title: 'Quantum Mechanics',
  displaytitle: 'Quantum Mechanics',
  extract:
    'Quantum mechanics is a fundamental theory in physics that provides a description of the physical properties of nature at the scale of atoms and subatomic particles.',
  pageid: 201,
  url: 'https://en.wikipedia.org/wiki/Quantum_mechanics',
  thumbnail: undefined as unknown as WikiArticle['thumbnail'],
};

const meta = {
  component: WikiCard,
  tags: ['ai-generated'],
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
    await expect(likeButton).toBeVisible();
    await userEvent.click(likeButton);
    await waitFor(() => {
      expect(likeButton.className).toMatch(/bg-red-500/);
    });
  },
};

export const NoThumbnail: Story = {
  args: {
    article: mockArticleNoImage,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Quantum Mechanics')).toBeVisible();
    await expect(
      canvas.getByText(/fundamental theory in physics/)
    ).toBeVisible();
  },
};

export const LongExtract: Story = {
  args: {
    article: {
      ...mockArticle,
      pageid: 301,
      title: 'History of Mathematics',
      displaytitle: 'History of Mathematics',
      extract:
        'The history of mathematics deals with the origin of discoveries in mathematics and the mathematical methods and notation of the past. Before the modern age and the worldwide spread of knowledge, written examples of new mathematical developments have come to light only in a few locales. From 3000 BC the Mesopotamian states of Sumer, Akkad and Assyria, followed closely by Ancient Egypt and the Levantine state of Ebla began using arithmetic, algebra and geometry for purposes of taxation, commerce, trade and also in the patterns in nature, the field of astronomy and to record time and formulate calendars.',
    },
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('History of Mathematics')).toBeVisible();
    await expect(canvas.getByText(/origin of discoveries/)).toBeVisible();
    // line-clamp-6 is applied to the extract text
    const extractEl = canvas.getByText(/origin of discoveries/);
    await expect(extractEl.className).toMatch(/line-clamp/);
  },
};
