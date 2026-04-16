import type { Meta, StoryObj } from '@storybook/react-vite';
import { Page } from './Page';

const meta = {
  title: 'AI Generated/Medium/Page',
  component: Page,
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithCustomLayout: Story = {
  parameters: {
    layout: 'fullscreen',
  },
};
