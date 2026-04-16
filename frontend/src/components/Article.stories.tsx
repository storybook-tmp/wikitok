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
      'Computing has evolved from simple mechanical devices to complex electronic systems that power modern civilization.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Eniac.jpg/800px-Eniac.jpg',
  },
};

export const WithoutImage: Story = {
  args: {
    title: 'Philosophy of Mind',
    content:
      'Philosophy of mind is a branch of philosophy that studies the ontology and nature of the mind and its relationship with the body.',
  },
};
