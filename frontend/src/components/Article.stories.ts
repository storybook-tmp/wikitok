import type { Meta, StoryObj } from '@storybook/react-vite';
import Article from './Article';
import '../styles/Article.css';

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
    title: 'The History of Wikipedia',
    content:
      'Wikipedia is a free-content online encyclopedia written and maintained by a community of volunteers through open collaboration and using a wiki-based editing system.',
  },
};

export const WithImage: Story = {
  args: {
    title: 'Mount Everest',
    content:
      'Mount Everest is Earth\'s highest mountain above sea level, located in the Mahalangur Himal sub-range of the Himalayas. The China–Nepal border runs across its summit point.',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Everest_North_Face_toward_Base_Camp_Tibet_Luca_Galuzzi_2006.jpg/640px-Everest_North_Face_toward_Base_Camp_Tibet_Luca_Galuzzi_2006.jpg',
  },
};
