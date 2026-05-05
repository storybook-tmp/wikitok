import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { WikiCard } from './WikiCard';

const mockArticle = {
  title: 'Quantum Computing',
  displaytitle: 'Quantum Computing',
  extract:
    'Quantum computing is a type of computation that harnesses quantum mechanical phenomena such as superposition and entanglement to process information.',
  pageid: 12345,
  url: 'https://en.wikipedia.org/wiki/Quantum_computing',
  thumbnail: {
    source: 'https://placehold.co/800x600/1a1a2e/ffffff?text=Quantum',
    width: 800,
    height: 600,
  },
};

const meta = {
  component: WikiCard,
  tags: ['ai-generated'],
  args: {
    article: mockArticle,
  },
  decorators: [
    (Story) => (
      <div style={{ height: '100vh', background: 'black' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof WikiCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    const link = canvas.getByRole('link', { name: /quantum computing/i });
    await expect(link).toHaveAttribute(
      'href',
      'https://en.wikipedia.org/wiki/Quantum_computing'
    );
  },
};

export const LongExtract: Story = {
  args: {
    article: {
      ...mockArticle,
      extract:
        'This is a very long extract that goes on and on. '.repeat(20),
    },
  },
};

export const WithLikeButton: Story = {
  play: async ({ canvas, userEvent }) => {
    const likeButton = canvas.getByRole('button', { name: /like article/i });
    await userEvent.click(likeButton);
    await expect(likeButton).toBeVisible();
  },
};

export const CssCheck: Story = {
  play: async ({ canvas }) => {
    // WikiCard uses snap-start and relative — verifies Tailwind loaded
    const heading = canvas.getByRole('heading', { name: /quantum computing/i });
    const wrapper = heading.closest('[class*="snap-start"]');
    await expect(getComputedStyle(wrapper!).position).toBe('relative');
  },
};
