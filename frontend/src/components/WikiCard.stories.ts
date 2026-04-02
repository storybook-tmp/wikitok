import type { Meta, StoryObj } from '@storybook/react-vite';

import { expect, userEvent, within } from 'storybook/test';

import { WikiCard } from './WikiCard';

const article = {
  title: 'Aurora Lake',
  displaytitle: 'Aurora Lake',
  extract:
    'Aurora Lake is a mock article that gives the card enough text to demonstrate the overlay and action controls.',
  pageid: 101,
  url: 'https://en.wikipedia.org/wiki/Aurora_Lake',
  thumbnail: {
    source:
      'data:image/svg+xml;utf8,' +
      encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1200">
          <rect width="800" height="1200" fill="#0f172a" />
          <rect x="0" y="760" width="800" height="440" fill="#1e293b" />
          <circle cx="560" cy="220" r="120" fill="#38bdf8" opacity="0.8" />
          <path d="M160 720l140-240 120 180 96-132 124 192z" fill="#94a3b8" opacity="0.75" />
        </svg>`,
      ),
    width: 800,
    height: 1200,
  },
};

const meta = {
  title: 'AI Generated/Complex/WikiCard',
  component: WikiCard,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    article,
  },
} satisfies Meta<typeof WikiCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Liked: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const likeButton = canvas.getByRole('button', { name: /like article/i });
    await userEvent.click(likeButton);
    await expect(likeButton.className).toContain('bg-red-500');
  },
};
