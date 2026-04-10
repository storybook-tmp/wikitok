import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent, fn } from 'storybook/test';
import ArticleList from './ArticleList';
import type { ArticleProps } from '../types/ArticleProps';

const sampleArticles: ArticleProps[] = [
  {
    id: 1,
    title: 'Eiffel Tower',
    content:
      'The Eiffel Tower is a wrought-iron lattice tower on the Champ de Mars in Paris, France.',
  },
  {
    id: 2,
    title: 'Great Wall of China',
    content:
      'The Great Wall of China is a series of fortifications built across the historical northern borders of ancient Chinese states.',
    image:
      'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
  },
  {
    id: 3,
    title: 'Colosseum',
    content:
      'The Colosseum is an oval amphitheatre in the centre of the city of Rome, Italy.',
  },
];

const meta = {
  component: ArticleList,
} satisfies Meta<typeof ArticleList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <ArticleList articles={sampleArticles} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('navigation')).toBeVisible();
    await expect(
      canvas.getByRole('heading', { name: /eiffel tower/i })
    ).toBeVisible();
    await expect(
      canvas.getByRole('heading', { name: /great wall/i })
    ).toBeVisible();
    await expect(
      canvas.getByRole('heading', { name: /colosseum/i })
    ).toBeVisible();
  },
};

export const Empty: Story = {
  render: () => (
    <div style={{ padding: '16px', minHeight: '50px' }}>
      <ArticleList articles={[]} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('navigation')).toBeInTheDocument();
    await expect(canvas.queryByRole('heading')).not.toBeInTheDocument();
    await expect(canvas.getByRole('list')).toBeInTheDocument();
  },
};

export const WithSelection: Story = {
  args: {
    onArticleSelect: fn(),
  },
  render: (args) => <ArticleList articles={sampleArticles} {...args} />,
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const firstItem = canvas.getByRole('listitem', {
      name: /article: eiffel tower/i,
    });
    await userEvent.click(firstItem);
    await expect(args.onArticleSelect).toHaveBeenCalledWith(sampleArticles[0]);
  },
};
