import type { Meta, StoryObj } from '@storybook/react';
import { WikiCard } from './WikiCard';

const meta = {
  title: 'AI Generated/Complex/WikiCard',
  component: WikiCard,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof WikiCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    article: {
      title: 'React (JavaScript library)',
      displaytitle: 'React (JavaScript library)',
      extract:
        'React is a free and open-source front-end JavaScript library for building user interfaces based on components. It is maintained by Meta and a community of individual developers and companies.',
      pageid: 55680944,
      url: 'https://en.wikipedia.org/wiki/React_(JavaScript_library)',
      thumbnail: {
        source:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/512px-React-icon.svg.png',
        width: 512,
        height: 512,
      },
    },
  },
};

export const LongExtract: Story = {
  args: {
    article: {
      title: 'TypeScript',
      displaytitle: 'TypeScript',
      extract:
        'TypeScript is a free and open-source high-level programming language developed by Microsoft that adds static typing with optional type annotations to JavaScript. It is designed for the development of large applications and transpiles to JavaScript. TypeScript may be used to develop JavaScript applications for both client-side and server-side execution. Multiple transpilation options are available.',
      pageid: 40561888,
      url: 'https://en.wikipedia.org/wiki/TypeScript',
      thumbnail: {
        source:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/512px-Typescript_logo_2020.svg.png',
        width: 512,
        height: 512,
      },
    },
  },
};
