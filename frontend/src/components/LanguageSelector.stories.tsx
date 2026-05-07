import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { LanguageSelector } from './LanguageSelector';

const meta = {
  component: LanguageSelector,
  tags: ['ai-generated'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof LanguageSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Closed: Story = {
  render: () => (
    <div className="bg-black p-6 text-white">
      <LanguageSelector />
    </div>
  ),
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('button', { name: /language/i }),
    ).toBeVisible();
    await expect(
      canvas.queryByRole('button', { name: /english/i }),
    ).not.toBeInTheDocument();
  },
};

export const OpenDropdown: Story = {
  render: () => (
    <div className="bg-black p-6 text-white">
      <LanguageSelector />
    </div>
  ),
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: /language/i }));

    await expect(
      canvas.getByRole('button', { name: /english/i }),
    ).toBeVisible();
    await expect(canvas.getByRole('button', { name: /deutsch/i })).toBeVisible();
  },
};

export const ClosesOnOutsideClick: Story = {
  render: () => (
    <div className="bg-black p-6 text-white">
      <LanguageSelector />
    </div>
  ),
  play: async ({ canvas, userEvent, canvasElement }) => {
    await userEvent.click(canvas.getByRole('button', { name: /language/i }));
    await expect(
      canvas.getByRole('button', { name: /english/i }),
    ).toBeVisible();

    await userEvent.click(canvasElement.ownerDocument.body);

    await expect(
      canvas.queryByRole('button', { name: /english/i }),
    ).not.toBeInTheDocument();
  },
};
