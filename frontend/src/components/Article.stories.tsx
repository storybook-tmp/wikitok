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
      title="Albert Einstein"
      content="Albert Einstein was a German-born theoretical physicist who is widely held to be one of the greatest and most influential scientists of all time."
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('article')).toBeVisible();
    await expect(canvas.getByText('Albert Einstein')).toBeVisible();
    await expect(canvas.getByText(/German-born theoretical physicist/i)).toBeVisible();
  },
};

export const WithImage: Story = {
  render: () => (
    <Article
      title="Mount Everest"
      content="Mount Everest is Earth's highest mountain above sea level, located in the Mahalangur Himal sub-range of the Himalayas."
      image="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Everest_North_Face_toward_Base_Camp_Tibet_Luca_Galuzzi_2006.jpg/800px-Everest_North_Face_toward_Base_Camp_Tibet_Luca_Galuzzi_2006.jpg"
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('article')).toBeVisible();
    await expect(canvas.getByText('Mount Everest')).toBeVisible();
    await expect(canvas.getByAltText(/Illustration for article: Mount Everest/i)).toBeVisible();
  },
};

export const LongContent: Story = {
  render: () => (
    <Article
      title="The Eiffel Tower"
      content="The Eiffel Tower is a wrought-iron lattice tower on the Champ de Mars in Paris, France. It is named after the engineer Gustave Eiffel, whose company designed and built the tower from 1887 to 1889. Locally nicknamed 'La dame de fer' (French for 'Iron Lady'), it was constructed as the centerpiece of the 1889 World's Fair, and to crown the centennial celebration of the French Revolution. Although initially criticised by some of France's leading artists and intellectuals for its design, it has since become a global cultural icon of France and one of the most recognisable structures in the world."
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('article')).toBeVisible();
    await expect(canvas.getByText('The Eiffel Tower')).toBeVisible();
    await expect(canvas.getByText(/wrought-iron lattice tower/i)).toBeVisible();
  },
};
