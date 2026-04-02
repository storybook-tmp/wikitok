import type { Meta, StoryObj } from '@storybook/react-vite';
import Article from './Article';

const meta = {
  title: 'AI Generated/Simple/Article',
  component: Article,
  tags: ['autodocs'],
} satisfies Meta<typeof Article>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    title: 'Understanding React Hooks',
    content: 'React Hooks allow you to use state and other React features without writing a class component. They make it easier to reuse logic across components.',
  },
};

export const WithImage: Story = {
  args: {
    title: 'The Power of TypeScript',
    content: 'TypeScript adds static typing to JavaScript, helping catch errors at compile time and improving code maintainability in large projects.',
    image: 'https://via.placeholder.com/400x300',
  },
};
