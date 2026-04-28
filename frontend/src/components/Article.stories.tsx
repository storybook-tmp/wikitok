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
      'Computing has evolved from mechanical calculators to quantum computers. The journey spans centuries of innovation and discovery.',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /history of computing/i })).toBeVisible();
    await expect(canvas.getByText(/mechanical calculators/i)).toBeVisible();
  },
};

export const WithImage: Story = {
  args: {
    title: 'Space Exploration',
    content:
      'Humanity has ventured beyond Earth, sending probes to the outer reaches of our solar system and landing rovers on Mars.',
    image: 'https://placehold.co/600x400/0d1b2a/ffffff?text=Space',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /space exploration/i })).toBeVisible();
    await expect(
      canvas.getByRole('img', { name: /illustration for article: space exploration/i }),
    ).toBeVisible();
  },
};

export const LongContent: Story = {
  args: {
    title: 'Climate Change',
    content:
      'Climate change refers to long-term shifts in temperatures and weather patterns. These shifts may be natural, but since the 1800s, human activities have been the main driver of climate change, primarily due to the burning of fossil fuels like coal, oil and gas. Burning fossil fuels generates greenhouse gas emissions that act like a blanket wrapped around the Earth, trapping the sun\'s heat and raising temperatures.',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /climate change/i })).toBeVisible();
    await expect(canvas.getByText(/greenhouse gas emissions/i)).toBeVisible();
  },
};
