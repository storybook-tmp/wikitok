import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import Article from './Article';

const meta = {
  component: Article,
  tags: ['ai-generated'],
} satisfies Meta<typeof Article>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'The History of the Internet',
    content:
      'The Internet developed from the ARPANET, which was funded by the US government to support projects within the government and at universities and research laboratories.',
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('heading', { name: /the history of the internet/i })
    ).toBeVisible();
    await expect(canvas.getByText(/arpanet/i)).toBeVisible();
  },
};

export const WithImage: Story = {
  args: {
    title: 'Space Exploration',
    content: 'Space exploration is the use of astronomy and space technology to explore outer space.',
    image: 'https://placehold.co/600x400/1a1a2e/ffffff?text=Space',
  },
};

export const LongContent: Story = {
  args: {
    title: 'Quantum Physics',
    content:
      'Quantum physics is the study of matter and energy at the most fundamental level. It aims to uncover the properties and behaviors of the very building blocks of nature. While many quantum experiments examine very small objects, such as electrons and photons, quantum phenomena are all around us, acting on every scale.',
  },
};
