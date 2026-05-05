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
    title: 'The History of Computing',
    content:
      'Computing has evolved from mechanical calculators to modern supercomputers. The journey began with Charles Babbage\'s Analytical Engine and progressed through vacuum tubes, transistors, and integrated circuits.',
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('heading', { name: /the history of computing/i })
    ).toBeVisible();
    await expect(canvas.getByText(/Charles Babbage/i)).toBeVisible();
  },
};

export const WithImage: Story = {
  args: {
    title: 'Marine Biology',
    content:
      'Marine biology is the scientific study of the biology of marine life, organisms in the sea. Given that in biology many phyla, families and genera have some species that live in the sea and others that live on land, marine biology classifies species based on the environment rather than on taxonomy.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/ocean.jpg/800px-ocean.jpg',
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('heading', { name: /marine biology/i })
    ).toBeVisible();
    await expect(
      canvas.getByRole('img', { name: /illustration for article: marine biology/i })
    ).toBeVisible();
    await expect(canvas.getByText(/scientific study/i)).toBeVisible();
  },
};

export const LongContent: Story = {
  args: {
    title: 'Quantum Mechanics',
    content:
      'Quantum mechanics is a fundamental theory in physics that describes the behavior of nature at and below the scale of atoms. It is the foundation of all quantum physics including quantum chemistry, quantum field theory, quantum technology, and quantum information science. Classical physics, the collection of theories that existed before the advent of quantum mechanics, describes many aspects of nature at an ordinary (macroscopic) scale, but is not sufficient for describing them at small (atomic and subatomic) scales.',
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('heading', { name: /quantum mechanics/i })
    ).toBeVisible();
    await expect(canvas.getByText(/fundamental theory in physics/i)).toBeVisible();
  },
};
