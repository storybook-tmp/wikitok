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
      'Computing has evolved from simple mechanical calculators to powerful modern computers that fit in our pockets.',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('The History of Computing')).toBeVisible();
    await expect(
      canvas.getByText(/computing has evolved/i),
    ).toBeVisible();
  },
};

export const WithImage: Story = {
  args: {
    title: 'Ocean Life',
    content:
      'The ocean is home to an incredible diversity of life, from tiny plankton to the massive blue whale.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Clownfish_in_Coral.jpg/800px-Clownfish_in_Coral.jpg',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Ocean Life')).toBeVisible();
    const img = canvas.getByAltText(/illustration for article: ocean life/i);
    await expect(img).toBeVisible();
  },
};

export const LongContent: Story = {
  args: {
    title: 'Artificial Intelligence',
    content:
      'Artificial intelligence is the simulation of human intelligence processes by computer systems. These processes include learning, reasoning, and self-correction. AI encompasses various subfields including machine learning, natural language processing, computer vision, and robotics. The field was founded on the claim that human intelligence can be so precisely described that a machine can be made to simulate it.',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Artificial Intelligence')).toBeVisible();
    await expect(
      canvas.getByText(/simulation of human intelligence/i),
    ).toBeVisible();
  },
};
