import type { Meta, StoryObj } from '@storybook/react-vite';
import { WikiCard } from './WikiCard';
import type { WikiArticle } from './WikiCard';

const mockArticle: WikiArticle = {
  title: 'Mount Everest',
  displaytitle: 'Mount Everest',
  extract:
    "Mount Everest is Earth's highest mountain above sea level, located in the Mahalangur Himal sub-range of the Himalayas. The China-Nepal border runs across its summit point. Its elevation of 8,848.86 m was most recently established in 2020 by the Chinese and Nepali authorities.",
  pageid: 14838,
  url: 'https://en.wikipedia.org/wiki/Mount_Everest',
  thumbnail: {
    source:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Everest_North_Face_toward_Base_Camp_Tibet_Luca_Galuzzi_2006.jpg/800px-Everest_North_Face_toward_Base_Camp_Tibet_Luca_Galuzzi_2006.jpg',
    width: 800,
    height: 534,
  },
};

const meta = {
  title: 'AI Generated/Complex/WikiCard',
  component: WikiCard,
} satisfies Meta<typeof WikiCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    article: mockArticle,
  },
};

export const ShortExtract: Story = {
  args: {
    article: {
      ...mockArticle,
      title: 'Mars',
      displaytitle: 'Mars',
      extract: 'Mars is the fourth planet from the Sun.',
      pageid: 14640,
    },
  },
};
