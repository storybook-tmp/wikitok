import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';
import { WikiCard, type WikiArticle } from './WikiCard';

const sampleImage =
  'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22800%22 height=%221000%22 viewBox=%220 0 800 1000%22%3E%3Crect width=%22800%22 height=%221000%22 fill=%22%23111827%22/%3E%3Ccircle cx=%22400%22 cy=%22360%22 r=%22190%22 fill=%22%23f97316%22/%3E%3Cpath d=%22M150 760c110-160 390-160 500 0%22 fill=%22%23059669%22/%3E%3C/svg%3E';

const article: WikiArticle = {
  title: 'Grace Hopper',
  displaytitle: 'Grace Hopper',
  extract:
    'Grace Hopper was an American computer scientist and United States Navy rear admiral who helped develop early compilers.',
  pageid: 2001,
  url: 'https://en.wikipedia.org/wiki/Grace_Hopper',
  thumbnail: {
    source: sampleImage,
    width: 800,
    height: 1000,
  },
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
  args: { article },
};

export const LongExtract: Story = {
  args: {
    article: {
      ...article,
      pageid: 2002,
      displaytitle: 'Computing history',
      extract:
        'Computing history includes mechanical calculators, early programmable machines, wartime codebreaking systems, mainframes, personal computers, and networked software. This longer summary checks how the overlay handles multi-sentence article text inside the clamped description area.',
    },
  },
};

export const LikedAfterClick: Story = {
  args: { article: { ...article, pageid: 2003 } },
  play: async ({ canvas, userEvent }) => {
    const likeButton = canvas.getByRole('button', { name: /like article/i });
    await userEvent.click(likeButton);
    await waitFor(() => expect(likeButton).toHaveClass(/bg-red-500/));
  },
};

export const CssCheck: Story = {
  args: { article: { ...article, pageid: 2004 } },
  play: async ({ canvas }) => {
    const likeButton = canvas.getByRole('button', { name: /like article/i });
    await expect(getComputedStyle(likeButton).backgroundColor).toBe(
      'oklab(0.999994 0.0000455678 0.0000200868 / 0.1)'
    );
  },
};
