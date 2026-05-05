import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import Article from './Article';
import '../styles/Article.css';

const meta = {
  component: Article,
  tags: ['ai-generated'],
} satisfies Meta<typeof Article>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'The Science of Sleep',
    content:
      'Sleep is a naturally recurring state of mind and body, characterized by altered consciousness, relatively inhibited sensory activity, reduced muscle activity, and reduced interactions with surroundings.',
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('heading', { name: /the science of sleep/i }),
    ).toBeVisible();
    await expect(
      canvas.getByText(/sleep is a naturally recurring/i),
    ).toBeVisible();
  },
};

export const WithImage: Story = {
  args: {
    title: 'Marine Biology',
    content:
      'Marine biology is the scientific study of the biology of marine life, organisms in the sea. Given that in biology many phyla, families and genera have some species that live in the sea and others that live on land.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/marine.jpg/800px-marine.jpg',
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('heading', { name: /marine biology/i }),
    ).toBeVisible();
    await expect(
      canvas.getByRole('img', { name: /illustration for article: marine biology/i }),
    ).toBeVisible();
  },
};

export const LongContent: Story = {
  args: {
    title: 'History of Computing',
    content:
      'The history of computing hardware covers the developments from early simple devices to aid calculation to modern day computers. Before the 20th century, most calculations were done by humans. Early mechanical tools to help humans with digital calculations, like the abacus, were referred to as calculating machines or calculators. The machine operator was called the computer. The first aids to computation were purely mechanical devices which required the operator to set up the initial values of an elementary arithmetic operation, then manipulate the device to obtain the result.',
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('heading', { name: /history of computing/i }),
    ).toBeVisible();
    await expect(canvas.getByText(/the history of computing/i)).toBeVisible();
  },
};
