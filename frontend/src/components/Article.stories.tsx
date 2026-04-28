import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import Article from './Article';

const meta = {
  component: Article,
  tags: ['ai-generated'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Article>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'The Solar System',
    content:
      'The Solar System is the gravitationally bound system of the Sun and the objects that orbit it.',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('The Solar System')).toBeVisible();
    await expect(canvas.getByText(/gravitationally bound system/)).toBeVisible();
  },
};

export const WithImage: Story = {
  args: {
    title: 'Mount Everest',
    content:
      'Mount Everest is the tallest mountain above sea level, located in the Mahalangur Himal sub-range of the Himalayas.',
    image: 'https://placehold.co/400x300/2d4a3e/ffffff?text=Everest',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Mount Everest')).toBeVisible();
    const img = canvas.getByRole('img');
    await expect(img).toBeVisible();
    await expect(img).toHaveAttribute('alt', 'Illustration for article: Mount Everest');
  },
};

export const LongContent: Story = {
  args: {
    title: 'History of Mathematics',
    content:
      'The history of mathematics deals with the origin of discoveries in mathematics and the mathematical methods and notation of the past. Before the modern age and the worldwide spread of knowledge, written examples of new mathematical developments have come to light only in a few locales.',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('History of Mathematics')).toBeVisible();
    await expect(
      canvas.getByText(/mathematical methods and notation/),
    ).toBeVisible();
  },
};
