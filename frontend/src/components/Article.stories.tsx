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
      'The history of computing hardware covers the developments from early simple devices to aid calculation to modern day computers. The first aids to computation were purely mechanical devices which required the operator to set up the initial values.',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('article')).toBeVisible();
    await expect(
      canvas.getByText('The History of Computing')
    ).toBeVisible();
    await expect(canvas.getByText(/first aids to computation/i)).toBeVisible();
  },
};

export const WithImage: Story = {
  args: {
    title: 'Space Exploration',
    content:
      'Space exploration is the use of astronomy and space technology to explore outer space. Physical exploration of space is conducted both by human spaceflights and by robotic spacecraft.',
    image: 'https://picsum.photos/seed/space/400/300',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('article')).toBeVisible();
    await expect(
      canvas.getByAltText(/illustration for article: space exploration/i)
    ).toBeVisible();
  },
};

export const LongContent: Story = {
  args: {
    title: 'Quantum Mechanics',
    content:
      'Quantum mechanics is a fundamental theory in physics that provides a description of the physical properties of nature at the scale of atoms and subatomic particles. It is the foundation of all quantum physics including quantum chemistry, quantum field theory, quantum technology, and quantum information science. Classical physics, the collection of theories that existed before the advent of quantum mechanics, describes many aspects of nature at an ordinary (macroscopic) scale, but is not sufficient for describing them at small (atomic and subatomic) scales.',
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByText('Quantum Mechanics')
    ).toBeVisible();
    await expect(canvas.getByText(/fundamental theory in physics/i)).toBeVisible();
  },
};
