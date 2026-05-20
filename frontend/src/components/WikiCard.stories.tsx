import type { Meta, StoryObj } from '@storybook/react-vite';
import { WikiCard } from './WikiCard';
import type { WikiArticle } from './WikiCard';

const meta = {
  title: 'AI Generated/Complex/WikiCard',
  component: WikiCard,
} satisfies Meta<typeof WikiCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const mountainArticle: WikiArticle = {
  title: 'Mount_Everest',
  displaytitle: 'Mount Everest',
  extract:
    "Mount Everest is Earth's highest mountain above sea level, located in the Mahalangur Himal sub-range of the Himalayas. The China–Nepal border runs across its summit point. Its elevation of 8,848.86 m was most recently established in 2020 by the Chinese and Nepali authorities.",
  pageid: 26844,
  url: 'https://en.wikipedia.org/wiki/Mount_Everest',
  thumbnail: {
    source:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Everest_North_Face_toward_Base_Camp_Tibet_Luca_Galuzzi_2006.jpg/800px-Everest_North_Face_toward_Base_Camp_Tibet_Luca_Galuzzi_2006.jpg',
    width: 800,
    height: 600,
  },
};

const internetArticle: WikiArticle = {
  title: 'History_of_the_Internet',
  displaytitle: 'History of the Internet',
  extract:
    'The history of the Internet has its origin in the efforts to build and interconnect computer networks that arose from research and development in the United States and involved international collaboration, particularly with researchers in the United Kingdom and France. Computer science was an emerging discipline in the late 1950s that began to consider time-sharing between computer users, and later, the possibility of achieving this over wide area networks. Independently, Paul Baran proposed a distributed network based on data in message blocks in the early 1960s.',
  pageid: 15493,
  url: 'https://en.wikipedia.org/wiki/History_of_the_Internet',
  thumbnail: {
    source:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Internet_map_1024.jpg/800px-Internet_map_1024.jpg',
    width: 800,
    height: 600,
  },
};

export const Default: Story = {
  args: {
    article: mountainArticle,
  },
};

export const LongExtract: Story = {
  args: {
    article: internetArticle,
  },
};
