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
      title="The Great Barrier Reef"
      content="The Great Barrier Reef is the world's largest coral reef system composed of over 2,900 individual reefs and 900 islands stretching for over 2,300 kilometres."
    />
  ),
};

export const WithImage: Story = {
  render: () => (
    <Article
      title="Mount Fuji"
      content="Mount Fuji is an active stratovolcano and the tallest peak in Japan. It is located on the island of Honshu and is one of Japan's most iconic landmarks."
      image="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Cdefs%3E%3ClinearGradient id='a' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%2389c'/%3E%3Cstop offset='1' stop-color='%23456'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23a)' width='400' height='300'/%3E%3C/svg%3E"
    />
  ),
};

export const LongContent: Story = {
  render: () => (
    <Article
      title="History of the Roman Empire"
      content="The Roman Empire was the post-Republican period of ancient Rome. As a polity, it included large territorial holdings around the Mediterranean Sea in Europe, Northern Africa, and Western Asia, ruled by emperors. From the accession of Caesar Augustus as the first Roman emperor to the military anarchy of the 3rd century, it was a principate with Italy as the metropole of its provinces and the city of Rome as its sole capital. The empire was later ruled by multiple emperors who shared control over the Western Roman Empire and the Eastern Roman Empire. The city of Rome was the largest city in the world from c. 100 BC to c. AD 400, with Constantinople becoming the largest around AD 500."
    />
  ),
};
