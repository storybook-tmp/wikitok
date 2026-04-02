import type { Meta, StoryObj } from '@storybook/react-vite';
import { WikiCard } from './WikiCard';

const meta = {
  title: 'AI Generated/Medium/WikiCard',
  component: WikiCard,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof WikiCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    article: {
      title: 'Albert Einstein',
      displaytitle: 'Albert Einstein',
      extract:
        'Albert Einstein was a German-born theoretical physicist who is widely held to be one of the greatest and most influential scientists of all time. He is best known for developing the theory of relativity.',
      pageid: 736,
      url: 'https://en.wikipedia.org/wiki/Albert_Einstein',
      thumbnail: {
        source:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Einstein_1921_by_F_Schmutzer_-_restoration.jpg/800px-Einstein_1921_by_F_Schmutzer_-_restoration.jpg',
        width: 800,
        height: 1068,
      },
    },
  },
};

export const LongExtract: Story = {
  args: {
    article: {
      title: 'History of science',
      displaytitle: 'History of Science',
      extract:
        'The history of science covers the development of science from ancient times to the present. It encompasses the natural sciences, social sciences, and formal sciences. Science has ancient roots throughout the world, particularly in China, India, Mesopotamia, Egypt, and Greece. Early scientific thought was deeply intertwined with philosophy and religion.',
      pageid: 2000,
      url: 'https://en.wikipedia.org/wiki/History_of_science',
      thumbnail: {
        source:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Tsunami_by_hokusai_19th_century.jpg/800px-Tsunami_by_hokusai_19th_century.jpg',
        width: 800,
        height: 553,
      },
    },
  },
};
