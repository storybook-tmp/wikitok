import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { WikiCard } from './WikiCard';

const meta = {
  component: WikiCard,
  tags: ['ai-generated'],
  args: {
    article: {
      title: 'Mount Everest',
      displaytitle: 'Mount Everest',
      extract:
        'Mount Everest is the highest mountain in the world, located in the Mahalangur Himal sub-range of the Himalayas.',
      pageid: 12345,
      url: 'https://en.wikipedia.org/wiki/Mount_Everest',
      thumbnail: {
        source: 'https://placehold.co/800x600/333/white?text=Mount+Everest',
        width: 800,
        height: 600,
      },
    },
  },
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof WikiCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('button', { name: /like article/i })
    ).toBeVisible();
    await expect(
      canvas.getByRole('button', { name: /share article/i })
    ).toBeVisible();
  },
};

export const LongExtract: Story = {
  args: {
    article: {
      title: 'History of Computing',
      displaytitle: 'History of Computing',
      extract:
        'The history of computing hardware covers the developments from early simple devices to aid calculation to modern day computers. Before the 20th century, most calculations were done by humans. Early mechanical tools to help humans with digital calculations, like the abacus, were referred to as calculating machines or calculators. The machine operator was called the computer.',
      pageid: 99999,
      url: 'https://en.wikipedia.org/wiki/History_of_computing',
      thumbnail: {
        source: 'https://placehold.co/800x600/333/white?text=Computing',
        width: 800,
        height: 600,
      },
    },
  },
};

export const CssCheck: Story = {
  play: async ({ canvas }) => {
    const card = canvas.getByText('Mount Everest').closest('div');
    // WikiCard uses bg-black on outer container via Tailwind — fails if Tailwind did not load
    const outerContainer = canvas.getByText('Mount Everest').closest('.h-screen');
    await expect(getComputedStyle(outerContainer!).position).toBe('relative');
  },
};
