import type { Meta, StoryObj } from '@storybook/react-vite';
import Article from './Article';
import { sampleArticle } from '../storybook/fixtures';

const meta = {
  title: 'AI Generated/Simple/Article',
  component: Article,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="max-w-2xl bg-white p-6 text-black">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Article>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithImage: Story = {
  args: sampleArticle,
};

export const TextOnly: Story = {
  args: {
    ...sampleArticle,
    image: undefined,
  },
};
