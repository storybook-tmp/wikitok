import type { Meta, StoryObj } from '@storybook/react-vite';
import { within, userEvent } from 'storybook/test';
import { Page } from './Page';

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
    const signUpButton = canvas.getByRole('button', { name: /sign up/i });
    await userEvent.click(signUpButton);
  },
};
