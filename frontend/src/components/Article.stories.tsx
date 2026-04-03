import type { Meta, StoryObj } from '@storybook/react-vite';
import Article from './Article';

const meta = {
  component: Article,
} satisfies Meta<typeof Article>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Article
      title="Monarch Butterfly"
      content="The monarch butterfly is a milkweed butterfly in the family Nymphalidae. It is perhaps the best known of all North American butterflies and is considered an iconic pollinator species."
    />
  ),
};

export const WithImage: Story = {
  render: () => (
    <Article
      title="Great Wall of China"
      content="The Great Wall of China is a series of fortifications built across the historical northern borders of ancient Chinese states and Imperial China."
      image="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400'%3E%3Crect width='800' height='400' fill='%231e5f3a'/%3E%3C/svg%3E"
    />
  ),
};

export const LongContent: Story = {
  render: () => (
    <Article
      title="History of Mathematics"
      content="The history of mathematics deals with the origin of discoveries in mathematics and the mathematical methods and notation of the past. Before the modern age and the worldwide spread of knowledge, written examples of new mathematical developments have come to light only in a few locales. From 3000 BC the Mesopotamian states of Sumer, Akkad and Assyria, followed closely by Ancient Egypt and the Levantine state of Ebla began using arithmetic, algebra and geometry for purposes of taxation, commerce, trade and also in the patterns in nature, the field of astronomy and to record time and formulate calendars."
    />
  ),
};
