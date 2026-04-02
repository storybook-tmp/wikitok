import type { Meta, StoryObj } from '@storybook/react-vite';
import Article from './Article';

const meta = {
  title: 'AI Generated/Simple/Article',
  component: Article,
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
      'Computing has a rich history dating back to the earliest mechanical calculators. Modern computers evolved from room-sized mainframes to powerful devices that fit in our pockets.',
  },
};

export const WithImage: Story = {
  args: {
    title: 'Nature Photography',
    content:
      'Nature photography captures the beauty of the natural world through careful composition and timing.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/24701-nature-702702.jpg/320px-24701-nature-702702.jpg',
  },
};
