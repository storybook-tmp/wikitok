import type { Meta, StoryObj } from '@storybook/react-vite';

import { expect, userEvent, within } from 'storybook/test';

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

export const LoggedOut: Story = {};

export const LoggedIn: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const loginButton = canvas.getByRole('button', { name: /log in/i });

    await expect(loginButton).toBeInTheDocument();
    await userEvent.click(loginButton);
    await expect(canvas.getByText(/welcome, /i)).toBeInTheDocument();
    await expect(
      canvas.getByRole('button', {
        name: /log out/i,
      }),
    ).toBeInTheDocument();
  },
};
