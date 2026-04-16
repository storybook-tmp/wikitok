import type { Meta, StoryObj } from '@storybook/react-vite';
import Article from './Article';
import '../styles/Article.css';

const meta = {
  component: Article,
} satisfies Meta<typeof Article>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Article
      title="The History of the Internet"
      content="The Internet is a global system of interconnected computer networks that uses the Internet protocol suite (TCP/IP) to communicate between networks and devices. It is a network of networks that consists of private, public, academic, business, and government networks."
      image="https://picsum.photos/seed/internet/600/400"
    />
  ),
};

export const WithoutImage: Story = {
  render: () => (
    <Article
      title="Quantum Computing"
      content="Quantum computing is a type of computation whose operations can harness the phenomena of quantum mechanics, such as superposition, interference, and entanglement. Devices that perform quantum computations are known as quantum computers."
    />
  ),
};

export const LongContent: Story = {
  render: () => (
    <Article
      title="Climate Change"
      content="In common usage, climate change describes global warming—the ongoing increase in global average temperature—and its effects on Earth's climate system. Climate change in a broader sense also includes previous long-term changes to Earth's climate. The current rise in global average temperature is more rapid than previous changes, and is primarily caused by humans burning fossil fuels. Fossil fuel use, deforestation, and some agricultural and industrial practices add to greenhouse gases. These gases absorb some of the heat that the Earth radiates after it warms from sunlight, warming the lower atmosphere."
      image="https://picsum.photos/seed/climate/600/400"
    />
  ),
};
