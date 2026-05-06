import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { WikiCard } from './WikiCard';

const sampleArticle = {
  title: 'Aurora Borealis',
  displaytitle: 'Aurora Borealis',
  extract:
    'An aurora, also commonly known as the northern lights or southern lights, is a natural light display in Earth\'s sky, predominantly seen in high-latitude regions.',
  pageid: 12345,
  url: 'https://en.wikipedia.org/wiki/Aurora_Borealis',
  thumbnail: {
    source: 'https://placehold.co/800x600/1a1a2e/ffffff?text=Aurora+Borealis',
    width: 800,
    height: 600,
  },
};

const meta = {
  component: WikiCard,
  tags: ['ai-generated'],
  args: {
    article: sampleArticle,
  },
  decorators: [
    (Story) => (
      <div style={{ height: '100vh', width: '100%', background: '#000' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof WikiCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    const heading = canvas.getByRole('heading', { name: /aurora borealis/i });
    await expect(heading).toBeVisible();
    await expect(canvas.getByRole('button', { name: /like article/i })).toBeVisible();
    await expect(canvas.getByRole('button', { name: /share article/i })).toBeVisible();
  },
};

export const WithoutThumbnail: Story = {
  args: {
    article: {
      ...sampleArticle,
      thumbnail: undefined as any,
    },
  },
};

export const LongExtract: Story = {
  args: {
    article: {
      ...sampleArticle,
      extract:
        'An aurora, also commonly known as the northern lights or southern lights, is a natural light display in Earth\'s sky, predominantly seen in high-latitude regions. Auroras display dynamic patterns of brilliant lights that appear as curtains, rays, spirals, or dynamic flickers covering the entire sky. The effect is caused by the interaction of solar wind and magnetospheric charged particles with the upper atmosphere. Most auroras occur in a band known as the "auroral zone", which is typically 3° to 6° wide in latitude.',
    },
  },
};

export const ToggleLike: Story = {
  play: async ({ canvas, userEvent }) => {
    const likeButton = canvas.getByRole('button', { name: /like article/i });
    await userEvent.click(likeButton);
    // After clicking, the button should still be visible (now in liked state)
    await expect(likeButton).toBeVisible();
  },
};

export const CssCheck: Story = {
  play: async ({ canvasElement }) => {
    // index.css sets "html, body { overflow: hidden }" — <body> defaults to "visible",
    // so "hidden" proves the shared preview loaded the app's CSS.
    const body = canvasElement.ownerDocument.body;
    await expect(getComputedStyle(body).overflow).toBe('hidden');
  },
};
