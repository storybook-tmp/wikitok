import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import Article from './Article';

const meta = {
  component: Article,
} satisfies Meta<typeof Article>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Article
      title="Eiffel Tower"
      content="The Eiffel Tower is a wrought-iron lattice tower on the Champ de Mars in Paris, France."
      image="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('article')).toBeVisible();
    await expect(
      canvas.getByRole('heading', { name: /eiffel tower/i })
    ).toBeVisible();
    await expect(canvas.getByText(/wrought-iron lattice tower/i)).toBeVisible();
    await expect(canvas.getByRole('img')).toBeVisible();
  },
};

export const NoImage: Story = {
  render: () => (
    <Article
      title="Great Wall of China"
      content="The Great Wall of China is a series of fortifications built across the historical northern borders of ancient Chinese states."
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('article')).toBeVisible();
    await expect(
      canvas.getByRole('heading', { name: /great wall/i })
    ).toBeVisible();
    await expect(canvas.queryByRole('img')).not.toBeInTheDocument();
  },
};

export const LongContent: Story = {
  render: () => (
    <Article
      title="Colosseum"
      content="The Colosseum is an oval amphitheatre in the centre of the city of Rome, Italy, just east of the Roman Forum. It is the largest ancient amphitheatre ever built, and is still the largest standing amphitheatre in the world today, despite its age. Construction began under the emperor Vespasian in AD 72 and was completed in AD 80 under his successor and heir, Titus. Further modifications were made during the reign of Domitian. The three emperors that were patrons of the work are known as the Flavian dynasty, and the amphitheatre was named in Latin as the Amphitheatrum Flavium. The Flavian Amphitheatre could hold between 50,000 and 80,000 spectators at various points of its history."
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole('heading', { name: /colosseum/i })
    ).toBeVisible();
    await expect(canvas.getByText(/oval amphitheatre/i)).toBeVisible();
    await expect(canvas.getByText(/flavian dynasty/i)).toBeVisible();
  },
};
