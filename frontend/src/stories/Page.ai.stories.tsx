import type { Meta, StoryObj } from '@storybook/react-vite';
import { Page } from './Page';
import { userEvent, within } from 'storybook/test';

const meta = {
  title: 'AI Generated/Medium/Page',
  component: Page,
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LoggedIn: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const loginButton = canvas.getByRole('button', { name: /log in/i });
    await userEvent.click(loginButton);
  },
};
