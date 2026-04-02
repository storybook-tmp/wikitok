import type { Meta, StoryObj } from '@storybook/react-vite';
import Article from './Article';

const meta = {
  title: 'AI Generated/Simple/Article',
  component: Article,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Article>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'The History of the Internet',
    content: 'The Internet is a global network of billions of computers and other electronic devices. With the Internet, it is possible to access almost any information, communicate with anyone else in the world, and do much more.',
  },
};

export const WithImage: Story = {
  args: {
    title: 'Mount Everest',
    content: 'Mount Everest is Earth\'s highest mountain above sea level, located in the Mahalangur Himal sub-range of the Himalayas. Its elevation of 8,848.86 m was most recently established in 2020 by the Chinese and Nepali authorities.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Everest_North_Face_toward_Base_Camp_Tibet_Luca_Galuzzi_2006.jpg/640px-Everest_North_Face_toward_Base_Camp_Tibet_Luca_Galuzzi_2006.jpg',
  },
};
