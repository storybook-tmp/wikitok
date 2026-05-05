import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { WikiCard } from './WikiCard';

const sampleArticle = {
  title: 'Camponotus flavomarginatus',
  displaytitle: 'Camponotus flavomarginatus',
  extract:
    'Camponotus flavomarginatus is a species of carpenter ant. It is found in various regions across the world and is known for its distinctive appearance and behavior patterns in colony formation.',
  pageid: 12345,
  url: 'https://en.wikipedia.org/wiki/Camponotus_flavomarginatus',
  thumbnail: {
    source:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Camponotus_flavomarginatus_ant.jpg/800px-Camponotus_flavomarginatus_ant.jpg',
    width: 800,
    height: 600,
  },
};

const meta = {
  component: WikiCard,
  tags: ['ai-generated'],
  args: {
    article: sampleArticle,
  },
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof WikiCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('link', { name: /camponotus flavomarginatus/i })
    ).toHaveAttribute('href', 'https://en.wikipedia.org/wiki/Camponotus_flavomarginatus');
  },
};

export const LongExtract: Story = {
  args: {
    article: {
      ...sampleArticle,
      title: 'History of Mathematics',
      displaytitle: 'History of Mathematics',
      extract:
        'The history of mathematics deals with the origin of discoveries in mathematics and the mathematical methods and notation of the past. Before the modern age and the worldwide spread of knowledge, written examples of new mathematical developments have come to light only in a few locales. From 3000 BC the Mesopotamian states of Sumer, Akkad and Assyria, followed closely by Ancient Egypt and the Levantine state of Ebla began using arithmetic, algebra and geometry for purposes of taxation, commerce, trade and also in the patterns in nature, the field of astronomy and to record time and formulate calendars.',
      pageid: 99999,
    },
  },
};

export const NoThumbnail: Story = {
  args: {
    article: {
      ...sampleArticle,
      thumbnail: undefined as unknown as typeof sampleArticle.thumbnail,
      title: 'Abstract Concept',
      displaytitle: 'Abstract Concept',
    },
  },
};

export const LikeButton: Story = {
  play: async ({ canvas, userEvent }) => {
    const likeButton = canvas.getByRole('button', { name: /like article/i });
    await userEvent.click(likeButton);
    await expect(likeButton.querySelector('svg')).toHaveClass('fill-white');
  },
};

