import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import Article from './Article';

const meta = {
  component: Article,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof Article>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Article
      content="Aurora Forest preserves rare pine canopies, winter migration paths, and high-latitude wetlands."
      title="Aurora Forest"
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByRole('article')).toBeVisible();
    await expect(
      canvas.getByRole('heading', { name: /aurora forest/i }),
    ).toBeVisible();
  },
};

export const WithImage: Story = {
  render: () => (
    <Article
      content="City After Rain became famous for its transit canopies, reflective streets, and dense night markets."
      image="/wiki-logo.svg"
      title="City After Rain"
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(
      canvas.getByRole('img', {
        name: /illustration for article: city after rain/i,
      }),
    ).toBeVisible();
  },
};

export const LongFormContent: Story = {
  render: () => (
    <Article
      content="Desert Library gathers expedition journals, translated field notes, and oral histories from nearby caravan routes. The archive also maintains climate records that researchers use to compare centuries of weather and trade movement across the surrounding plateau."
      title="Desert Library"
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByLabelText(/article content/i)).toHaveTextContent(
      /climate records/i,
    );
  },
};
