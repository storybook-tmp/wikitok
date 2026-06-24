import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import ArticleList from './ArticleList';

const galleryImage =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360">
      <rect width="640" height="360" fill="#dcfce7" />
      <circle cx="120" cy="120" r="72" fill="#86efac" />
      <rect x="96" y="220" width="448" height="28" rx="14" fill="#14532d" opacity="0.22" />
      <rect x="144" y="266" width="352" height="20" rx="10" fill="#14532d" opacity="0.16" />
    </svg>`,
  );

const meta = {
  title: 'AI Generated/Medium/ArticleList',
  component: ArticleList,
  parameters: {
    layout: 'padded',
  },
  args: {
    onArticleSelect: fn(),
  },
} satisfies Meta<typeof ArticleList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const EditorialMix: Story = {
  args: {
    articles: [
      {
        id: 1,
        title: 'Exploring the morning feed',
        content: 'A short summary helps verify the list spacing and article grouping.',
      },
      {
        id: 2,
        title: 'Stories with imagery',
        content: 'This item includes an illustration to make sure mixed article layouts remain aligned.',
        image: galleryImage,
      },
    ],
  },
};

export const ImageHeavy: Story = {
  args: {
    articles: [
      {
        id: 3,
        title: 'Rich visual storytelling',
        content: 'All entries in this state include artwork so the image treatment can be reviewed in sequence.',
        image: galleryImage,
      },
      {
        id: 4,
        title: 'A second visual card',
        content: 'Repeated media is useful here because the component renders a nested Article for every list item.',
        image: galleryImage,
      },
      {
        id: 5,
        title: 'Compact copy still works',
        content: 'Even the shortest excerpt should remain clickable and keyboard accessible.',
        image: galleryImage,
      },
    ],
  },
};
