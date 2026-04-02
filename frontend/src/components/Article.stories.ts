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
    title: 'The Solar System',
    content:
      'The Solar System is the gravitationally bound system of the Sun and the objects that orbit it. It formed 4.6 billion years ago from the gravitational collapse of a giant interstellar molecular cloud.',
  },
};

export const WithImage: Story = {
  args: {
    title: 'Mountain Landscape',
    content:
      'Mountains are large natural elevations of the earth surface rising abruptly from the surrounding level.',
    image:
      'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200"><rect fill="%2394a3b8" width="300" height="200"/><text x="150" y="105" text-anchor="middle" fill="white" font-size="18">Placeholder</text></svg>',
  },
};
