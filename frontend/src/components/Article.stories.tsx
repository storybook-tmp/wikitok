import type { Meta, StoryObj } from '@storybook/react-vite';
import { articleStoryEntries } from '../../.storybook/mock-data';
import Article from './Article';

const meta = {
  component: Article,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof Article>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Article title={articleStoryEntries[0].title} content={articleStoryEntries[0].content} />,
};

export const WithImage: Story = {
  render: () => (
    <Article
      title={articleStoryEntries[1].title}
      content={articleStoryEntries[1].content}
      image={articleStoryEntries[1].image}
    />
  ),
};

export const LongformCopy: Story = {
  render: () => (
    <Article
      title="Field Notes From The Harbor Museum"
      content="The mock article component is used here with a longer passage so the content block reads like a condensed feature. It mirrors the kind of dense explanatory copy that appears throughout encyclopedia-style layouts, where the reader needs a clear heading, comfortable spacing, and a single uninterrupted body column."
      image="/wiki-logo.svg"
    />
  ),
};
