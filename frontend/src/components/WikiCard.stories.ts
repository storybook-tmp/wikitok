import type { Meta, StoryObj } from '@storybook/react-vite';
import { WikiCard } from './WikiCard';
import type { WikiArticle } from './WikiCard';

const eiffelTower: WikiArticle = {
  title: 'Eiffel_Tower',
  displaytitle: 'Eiffel Tower',
  extract:
    'The Eiffel Tower is a wrought-iron lattice tower on the Champ de Mars in Paris, France. It is named after the engineer Gustave Eiffel, whose company designed and built the tower from 1887 to 1889.',
  pageid: 9202,
  url: 'https://en.wikipedia.org/wiki/Eiffel_Tower',
  thumbnail: {
    source:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Tour_Eiffel_Wikimedia_Commons.jpg/400px-Tour_Eiffel_Wikimedia_Commons.jpg',
    width: 400,
    height: 600,
  },
};

const antarctica: WikiArticle = {
  title: 'Antarctica',
  displaytitle: 'Antarctica',
  extract:
    "Antarctica is Earth's southernmost and least-populated continent. Situated almost entirely south of the Antarctic Circle and surrounded by the Southern Ocean, it contains the geographic South Pole.",
  pageid: 37454,
  url: 'https://en.wikipedia.org/wiki/Antarctica',
  thumbnail: {
    source:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Antarctic_convergence.jpg/640px-Antarctic_convergence.jpg',
    width: 640,
    height: 480,
  },
};

const meta = {
  title: 'AI Generated/Medium/WikiCard',
  component: WikiCard,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof WikiCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithThumbnail: Story = {
  args: {
    article: eiffelTower,
  },
};

export const AnotherArticle: Story = {
  args: {
    article: antarctica,
  },
};
