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
    title: 'Introduction to Quantum Physics',
    content:
      'Quantum physics is a branch of physics that deals with the behavior of matter and energy at the smallest scales.',
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByText('Introduction to Quantum Physics'),
    ).toBeVisible();
    await expect(canvas.getByText(/quantum physics is a branch/i)).toBeVisible();
  },
};

export const WithImage: Story = {
  args: {
    title: 'The Great Wall of China',
    content:
      'The Great Wall of China is a series of fortifications that were built across the historical northern borders of ancient Chinese states.',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/The_Great_Wall_of_China_at_Jinshanling-edit.jpg/800px-The_Great_Wall_of_China_at_Jinshanling-edit.jpg',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('The Great Wall of China')).toBeVisible();
    await expect(
      canvas.getByAltText('Illustration for article: The Great Wall of China'),
    ).toBeVisible();
  },
};

export const LongContent: Story = {
  args: {
    title: 'History of Mathematics',
    content:
      'The history of mathematics deals with the origin of discoveries in mathematics and the mathematical methods and notation of the past. Before the modern age and the worldwide spread of knowledge, written examples of new mathematical developments have come to light only in a few locales. From 3000 BC the Mesopotamian states of Sumer, Akkad and Assyria, followed closely by Ancient Egypt and the Levantine state of Ebla began using arithmetic, algebra and geometry for purposes of taxation, commerce, trade and also in the patterns in nature, the field of astronomy and to record time and formulate calendars.',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('History of Mathematics')).toBeVisible();
    await expect(canvas.getByText(/mesopotamian states/i)).toBeVisible();
  },
};
