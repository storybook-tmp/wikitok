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
    title: 'The Science of Sleep',
    content:
      'Sleep is a naturally recurring state of mind and body, characterized by altered consciousness and relatively inhibited sensory activity.',
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('heading', { name: /the science of sleep/i })
    ).toHaveAttribute('id', 'article-title');
  },
};

export const WithImage: Story = {
  args: {
    title: 'Coral Reefs',
    content:
      'A coral reef is an underwater ecosystem characterized by reef-building corals.',
    image: 'https://placehold.co/600x400/069/white?text=Coral+Reef',
  },
};

export const LongContent: Story = {
  args: {
    title: 'Quantum Mechanics',
    content:
      'Quantum mechanics is a fundamental theory in physics that provides a description of the physical properties of nature at the scale of atoms and subatomic particles. It is the foundation of all quantum physics including quantum chemistry, quantum field theory, quantum technology, and quantum information science.',
  },
};
