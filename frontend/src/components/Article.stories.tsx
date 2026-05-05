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
    title: 'The Theory of Relativity',
    content:
      'The theory of relativity usually encompasses two interrelated physics theories by Albert Einstein: special relativity and general relativity, proposed and published in 1905 and 1915, respectively.',
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('heading', { name: /the theory of relativity/i })
    ).toHaveAttribute('id', 'article-title');
  },
};

export const WithImage: Story = {
  args: {
    title: 'The Solar System',
    content:
      'The Solar System is the gravitationally bound system of the Sun and the objects that orbit it.',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/The_Blue_Marble.jpg/800px-The_Blue_Marble.jpg',
  },
};

export const LongContent: Story = {
  args: {
    title: 'World History',
    content:
      'World history encompasses the study of records from around the world, from prehistoric times to the present day. It covers all regions and peoples, examining cultural, economic, social, political, and military developments across the ages. From the earliest civilizations in Mesopotamia to the modern globalized world.',
  },
};
