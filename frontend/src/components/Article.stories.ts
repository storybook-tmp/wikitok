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
    title: 'Sample Article',
    content:
      'This is the content of the article. It provides detailed information about the topic at hand.',
  },
};

export const WithImage: Story = {
  args: {
    title: 'Article with Image',
    content:
      'This article includes an illustrative image alongside the text content.',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/512px-React-icon.svg.png',
  },
};
