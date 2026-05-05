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
    title: 'The History of Jazz',
    content:
      'Jazz is a music genre that originated in the African-American communities of New Orleans in the late 19th and early 20th centuries.',
  },
  play: async ({ canvas }) => {
    const article = canvas.getByRole('article');
    await expect(article).toHaveAttribute('aria-labelledby', 'article-title');
  },
};

export const WithImage: Story = {
  args: {
    title: 'Coral Reef Ecosystems',
    content:
      'A coral reef is an underwater ecosystem characterized by reef-building corals. Reefs are formed of colonies of coral polyps held together by calcium carbonate.',
    image: 'https://placehold.co/400x300/0e4429/ffffff?text=Coral+Reef',
  },
};

export const LongContent: Story = {
  args: {
    title: 'Quantum Computing',
    content:
      'Quantum computing is a type of computation whose operations can harness the phenomena of quantum mechanics, such as superposition, interference, and entanglement. Devices that perform quantum computations are known as quantum computers. Though current quantum computers may be too small to outperform usual classical computers for practical applications, larger realizations are believed to be capable of solving certain computational problems, such as integer factorization, substantially faster than classical computers.',
  },
};
