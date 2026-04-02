import type { Meta, StoryObj } from '@storybook/react-vite';
import { WikiCard } from './WikiCard';

const meta = {
  title: 'AI Generated/Complex/WikiCard',
  component: WikiCard,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof WikiCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithImage: Story = {
  args: {
    article: {
      title: 'Mount_Everest',
      displaytitle: 'Mount Everest',
      extract: 'Mount Everest is Earth\'s highest mountain above sea level, located in the Mahalangur Himal sub-range of the Himalayas. Its elevation of 8,848.86 m was most recently established in 2020 by the Chinese and Nepali authorities.',
      pageid: 26758,
      url: 'https://en.wikipedia.org/wiki/Mount_Everest',
      thumbnail: {
        source: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Everest_North_Face_toward_Base_Camp_Tibet_Luca_Galuzzi_2006.jpg/640px-Everest_North_Face_toward_Base_Camp_Tibet_Luca_Galuzzi_2006.jpg',
        width: 640,
        height: 480,
      },
    },
  },
};

export const WithoutImage: Story = {
  args: {
    article: {
      title: 'Quantum_computing',
      displaytitle: 'Quantum computing',
      extract: 'A quantum computer is a computer that exploits quantum mechanical phenomena. On small scales, physical matter exhibits properties of both particles and waves, and quantum computing leverages this behavior using specialized hardware.',
      pageid: 25202,
      url: 'https://en.wikipedia.org/wiki/Quantum_computing',
      thumbnail: {
        source: '',
        width: 0,
        height: 0,
      },
    },
  },
};
