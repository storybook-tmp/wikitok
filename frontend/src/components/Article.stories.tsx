import type { Meta, StoryObj } from '@storybook/react-vite';
import Article from './Article';

const meta = {
  title: 'AI Generated/Simple/Article',
  component: Article,
} satisfies Meta<typeof Article>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'The History of Computing',
    content:
      'Computing has evolved dramatically from the early mechanical calculators to modern quantum computers. The journey spans centuries of innovation and creativity.',
  },
};

export const WithImage: Story = {
  args: {
    title: 'Ocean Exploration',
    content:
      'The deep ocean remains one of the least explored frontiers on Earth. Scientists continue to discover new species and geological formations in the abyss.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Clouds_over_the_Atlantic_Ocean.jpg/640px-Clouds_over_the_Atlantic_Ocean.jpg',
  },
};
