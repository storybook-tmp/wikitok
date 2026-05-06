import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import Article from './Article';

const meta = {
  component: Article,
  tags: ['ai-generated'],
} satisfies Meta<typeof Article>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'The History of Computing',
    content:
      'Computing has a rich history dating back to ancient abacuses and evolving through mechanical calculators to modern electronic computers.',
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('heading', { name: /history of computing/i }),
    ).toBeVisible();
    await expect(canvas.getByText(/rich history/i)).toBeVisible();
  },
};

export const WithImage: Story = {
  args: {
    title: 'Ocean Exploration',
    content:
      'The ocean covers more than 70% of Earth\'s surface and remains one of the least explored frontiers.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Clouds_over_the_Atlantic_Ocean.jpg/800px-Clouds_over_the_Atlantic_Ocean.jpg',
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('heading', { name: /ocean exploration/i }),
    ).toBeVisible();
    await expect(
      canvas.getByRole('img', { name: /illustration for article: ocean exploration/i }),
    ).toBeVisible();
  },
};

export const LongContent: Story = {
  args: {
    title: 'Quantum Physics',
    content:
      'Quantum mechanics is a fundamental theory in physics that provides a description of the physical properties of nature at the scale of atoms and subatomic particles. It is the foundation of all quantum physics including quantum chemistry, quantum field theory, quantum technology, and quantum information science. Classical physics, the collection of theories that existed before the advent of quantum mechanics, describes many aspects of nature at an ordinary scale, but is not sufficient for describing them at small scales.',
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('heading', { name: /quantum physics/i }),
    ).toBeVisible();
    await expect(canvas.getByText(/fundamental theory/i)).toBeVisible();
  },
};
