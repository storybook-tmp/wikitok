import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import Article from './Article';

const meta = {
  component: Article,
} satisfies Meta<typeof Article>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Article
      title="Quantum mechanics"
      content="Quantum mechanics is a fundamental theory in physics that provides a description of the physical properties of nature at the scale of atoms and subatomic particles."
    />
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('article')).toBeVisible();
    await expect(canvas.getByText('Quantum mechanics')).toBeVisible();
    await expect(canvas.getByText(/fundamental theory in physics/i)).toBeVisible();
  },
};

export const WithImage: Story = {
  render: () => (
    <Article
      title="Great Wall of China"
      content="The Great Wall of China is a series of fortifications that were built across the historical northern borders of ancient Chinese states and Imperial China."
      image="https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/The_Great_Wall_of_China_at_Jinshanling-edit.jpg/800px-The_Great_Wall_of_China_at_Jinshanling-edit.jpg"
    />
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Great Wall of China')).toBeVisible();
    const img = canvas.getByRole('img', { name: /illustration for article: great wall of china/i });
    await expect(img).toBeVisible();
  },
};

export const LongContent: Story = {
  render: () => (
    <Article
      title="Philosophy of mind"
      content="Philosophy of mind is a branch of philosophy that studies the ontology and nature of the mind and its relationship with the body. The mind–body problem is a paradigm issue in philosophy of mind, although other issues are addressed, such as the hard problem of consciousness, and the nature of particular mental states. Aspects of the mind that are studied include mental events, mental functions, mental properties, consciousness and its neural correlates, the ontology of the mind, the nature of thought, and the relationship of the mind to the body."
    />
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('article')).toBeVisible();
    await expect(canvas.getByText('Philosophy of mind')).toBeVisible();
    await expect(canvas.getByText(/branch of philosophy/i)).toBeVisible();
  },
};
