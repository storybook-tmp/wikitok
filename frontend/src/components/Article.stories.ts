import type { Meta, StoryObj } from '@storybook/react-vite';

import Article from './Article';

const illustration =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360">
      <rect width="640" height="360" fill="#e0f2fe" />
      <circle cx="160" cy="120" r="60" fill="#7dd3fc" />
      <rect x="96" y="208" width="448" height="24" rx="12" fill="#0f172a" opacity="0.18" />
      <rect x="128" y="252" width="384" height="20" rx="10" fill="#0f172a" opacity="0.14" />
    </svg>`,
  );

const meta = {
  title: 'AI Generated/Simple/Article',
  component: Article,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Article>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TextOnly: Story = {
  args: {
    title: 'Storybook keeps this article focused',
    content:
      'This story exercises the plain text layout so the component can be reviewed without any media attached.',
  },
};

export const WithIllustration: Story = {
  args: {
    title: 'A visual treatment with supporting copy',
    content:
      'Adding an image should preserve the heading hierarchy and keep the body content easy to scan.',
    image: illustration,
  },
};
