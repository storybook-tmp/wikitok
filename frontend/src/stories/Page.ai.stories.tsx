import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within, expect } from 'storybook/test';
import { Page } from './Page';

const meta = {
  title: 'AI Generated/Medium/Page',
  component: Page,
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AfterLogin: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const loginButton = canvas.getByRole('button', { name: /Log in/i });
    await userEvent.click(loginButton);
    await expect(canvas.getByText('Jane Doe')).toBeInTheDocument();
  },
};
