import type { Meta, StoryObj } from '@storybook/react-vite';
import { Page } from './Page';

const meta = {
  title: 'AI Generated/Complex/Page',
  component: Page,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Rendered: Story = {
  render: () => <Page />,
};
