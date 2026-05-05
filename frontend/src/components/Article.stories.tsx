import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import Article from './Article';
import '../styles/Article.css';

const meta = {
  component: Article,
  tags: ['ai-generated'],
} satisfies Meta<typeof Article>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Introduction to React',
    content:
      'React is a JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called components.',
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('heading', { name: /introduction to react/i }),
    ).toBeVisible();
    await expect(
      canvas.getByText(/react is a javascript library/i),
    ).toBeVisible();
  },
};

export const WithImage: Story = {
  args: {
    title: 'Great Barrier Reef',
    content:
      'The Great Barrier Reef is the world\'s largest coral reef system, composed of over 2,900 individual reefs and 900 islands.',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/GreatBarrierReef-EO.JPG/800px-GreatBarrierReef-EO.JPG',
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('heading', { name: /great barrier reef/i }),
    ).toBeVisible();
    await expect(
      canvas.getByRole('img', { name: /illustration for article: great barrier reef/i }),
    ).toBeVisible();
  },
};

export const LongContent: Story = {
  args: {
    title: 'History of Computing',
    content:
      'The history of computing is longer than the history of computing hardware and modern computing technology and includes the history of methods intended for pen and paper or for chalk and slate, with or without the aid of tables. Computing is intimately tied to the representation of numbers, although mathematical operations are certainly more complex than just counting. The earliest known tool for use in computation was the abacus, which was thought to have been invented in Babylon circa 2400 BC.',
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('heading', { name: /history of computing/i }),
    ).toBeVisible();
    await expect(canvas.getByText(/abacus/i)).toBeVisible();
  },
};
