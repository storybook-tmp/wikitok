import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';
import { LanguageSelector } from './LanguageSelector';

const meta = {
  component: LanguageSelector,
  decorators: [
    (Story) => (
      <div className="bg-black p-4 flex justify-end">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof LanguageSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <LanguageSelector />,
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /language/i })).toBeVisible();
  },
};

export const DropdownOpen: Story = {
  render: () => <LanguageSelector />,
  play: async ({ canvas, userEvent }) => {
    const button = canvas.getByRole('button', { name: /language/i });
    await userEvent.click(button);
    await waitFor(() => {
      expect(canvas.getAllByRole('button').length).toBeGreaterThan(1);
    });
    const allButtons = canvas.getAllByRole('button');
    await expect(allButtons.length).toBeGreaterThan(10);
  },
};

export const DropdownShowsLanguages: Story = {
  render: () => <LanguageSelector />,
  play: async ({ canvas, userEvent }) => {
    const button = canvas.getByRole('button', { name: /language/i });
    await userEvent.click(button);
    await waitFor(() => {
      expect(canvas.getByRole('button', { name: /English/i })).toBeVisible();
    });
    await expect(canvas.getByRole('button', { name: /Deutsch/i })).toBeVisible();
  },
};
