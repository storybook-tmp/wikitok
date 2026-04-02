import type { Meta, StoryObj } from '@storybook/react';
import { WikiCard, type WikiArticle } from './WikiCard';

const meta = {
  title: 'AI Generated/Complex/WikiCard',
  component: WikiCard,
} satisfies Meta<typeof WikiCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleArticle: WikiArticle = {
  title: 'Artificial Intelligence',
  displaytitle: 'Artificial Intelligence',
  extract: 'Artificial intelligence (AI) is the intelligence of machines or software, as opposed to the natural intelligence of humans or animals. AI is defined as the simulation of human intelligence processes by computer systems.',
  pageid: 123456,
  url: 'https://en.wikipedia.org/wiki/Artificial_intelligence',
  thumbnail: {
    source: 'https://images.unsplash.com/photo-1677442d019cf157dcf726b721fce63fb8dcf45e?w=640&h=360&fit=crop',
    width: 640,
    height: 360,
  },
};

const articleWithoutImage: WikiArticle = {
  title: 'Philosophy',
  displaytitle: 'Philosophy',
  extract: 'Philosophy is the study of general and fundamental questions about existence, knowledge, values, reason, mind, and language. Such questions are often posed as problems to be studied or resolved.',
  pageid: 789012,
  url: 'https://en.wikipedia.org/wiki/Philosophy',
  thumbnail: {
    source: '',
    width: 0,
    height: 0,
  },
};

const scientificArticle: WikiArticle = {
  title: 'Quantum Mechanics',
  displaytitle: 'Quantum Mechanics',
  extract: 'Quantum mechanics is a fundamental theory in physics that provides a description of the physical properties of nature at the scale of atoms and subatomic particles. It is the foundation of all quantum physics.',
  pageid: 345678,
  url: 'https://en.wikipedia.org/wiki/Quantum_mechanics',
  thumbnail: {
    source: 'https://images.unsplash.com/photo-1635070041078-e571953c186d?w=640&h=360&fit=crop',
    width: 640,
    height: 360,
  },
};

export const Default: Story = {
  args: {
    article: sampleArticle,
  },
};

export const WithoutThumbnail: Story = {
  args: {
    article: articleWithoutImage,
  },
};

export const ScientificArticle: Story = {
  args: {
    article: scientificArticle,
  },
};
