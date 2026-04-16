import type { Meta, StoryObj } from '@storybook/react-vite';
import { userEvent } from 'storybook/test';
import App from './App';
import type { WikiArticle } from './components/WikiCard';

const meta = {
  component: App,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof App>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <App />,
  async play({ canvas }) {
    await canvas.findByText('Aurora Borealis');
  },
};

export const AboutModal: Story = {
  render: () => <App />,
  async play({ canvas }) {
    const aboutButton = canvas.getByText('About');
    await userEvent.click(aboutButton);
  },
};

const likedArticle: WikiArticle = {
  pageid: 3001,
  title: 'Quantum Computing',
  displaytitle: 'Quantum Computing',
  extract:
    'Quantum computing is a type of computation that uses quantum-mechanical phenomena, such as superposition and entanglement, to process data.',
  url: 'https://en.wikipedia.org/wiki/Quantum_computing',
  thumbnail: {
    source:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600'%3E%3Crect fill='%23346' width='800' height='600'/%3E%3C/svg%3E",
    width: 800,
    height: 600,
  },
};

export const LikesModal: Story = {
  async beforeEach() {
    localStorage.setItem('likedArticles', JSON.stringify([likedArticle]));
  },
  render: () => <App />,
  async play({ canvas }) {
    const likesButton = canvas.getByText('Likes');
    await userEvent.click(likesButton);
  },
};
