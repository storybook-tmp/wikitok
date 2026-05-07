import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';
import { WikiCard, type WikiArticle } from './WikiCard';

const article: WikiArticle = {
  title: 'Deep-sea hydrothermal vent',
  displaytitle: 'Deep-sea hydrothermal vent',
  extract:
    'Hydrothermal vents support unusual ecosystems that thrive without sunlight near volcanic activity on the ocean floor.',
  pageid: 42,
  url: 'https://en.wikipedia.org/wiki/Hydrothermal_vent',
  thumbnail: {
    source: '/wiki-logo.svg',
    width: 800,
    height: 800,
  },
};

const meta = {
  component: WikiCard,
  tags: ['ai-generated'],
  args: {
    article,
  },
} satisfies Meta<typeof WikiCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LikedByClick: Story = {
  play: async ({ canvas, userEvent }) => {
    const likeButton = canvas.getByRole('button', { name: /like article/i });
    await userEvent.click(likeButton);
    await waitFor(() => expect(likeButton.className).toContain('bg-red-500'));
  },
};

export const WithoutThumbnail: Story = {
  args: {
    article: {
      ...article,
      title: 'Article without image',
      displaytitle: 'Article without image',
      thumbnail: undefined as unknown as WikiArticle['thumbnail'],
    },
  },
};

export const CssCheck: Story = {
  play: async ({ canvas }) => {
    const heading = canvas.getByRole('heading', {
      name: /deep-sea hydrothermal vent/i,
    });
    await expect(getComputedStyle(heading).color).toBe('rgb(255, 255, 255)');
  },
};
