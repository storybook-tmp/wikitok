import type { Meta, StoryObj } from '@storybook/react-vite';

import { expect } from 'storybook/test';

import { Page } from './Page';

const meta = {
  component: Page,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  tags: ['ai-generated'],
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedOut: Story = {
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('heading', { name: /pages in storybook/i }),
    ).toBeVisible();
    await expect(canvas.getByRole('button', { name: /log in/i })).toBeVisible();
  },
};

// More on component testing: https://storybook.js.org/docs/writing-tests/interaction-testing
export const LoggedIn: Story = {
  play: async ({ canvas, userEvent }) => {
    const loginButton = canvas.getByRole('button', { name: /Log in/i });
    await expect(loginButton).toBeVisible();
    await userEvent.click(loginButton);

    const logoutButton = canvas.getByRole('button', { name: /Log out/i });
    await expect(logoutButton).toBeVisible();
  },
};
