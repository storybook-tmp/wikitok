import type { Meta, StoryObj } from '@storybook/react';
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
      'Computing has evolved from simple mechanical calculators to powerful quantum computers. The journey began with Charles Babbage and Ada Lovelace in the 19th century.',
  },
};

export const WithImage: Story = {
  args: {
    title: 'Northern Lights',
    content:
      'The aurora borealis is a natural light display predominantly seen in high-latitude regions around the Arctic.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Polarlicht_2.jpg/320px-Polarlicht_2.jpg',
  },
};
