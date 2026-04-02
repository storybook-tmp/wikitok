import type { Meta, StoryObj } from '@storybook/react-vite';
import { Page } from './Page';

const meta = {
  title: 'AI Generated/Medium/Page',
  component: Page,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LoggedIn: Story = {
  play: async ({ canvasElement }) => {
    const { userEvent, within } = await import('storybook/test');
    const canvas = within(canvasElement);
    const loginButton = canvas.getByRole('button', { name: /Log in/i });
    await userEvent.click(loginButton);
  },
};
