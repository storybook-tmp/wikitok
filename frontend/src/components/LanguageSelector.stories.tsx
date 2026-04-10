import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent } from 'storybook/test';
import { LanguageSelector } from './LanguageSelector';

const meta = {
  component: LanguageSelector,
} satisfies Meta<typeof LanguageSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="bg-black p-4">
      <LanguageSelector />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole('button', { name: /language/i })
    ).toBeVisible();
  },
};

export const Open: Story = {
  render: () => (
    <div className="bg-black p-4" style={{ height: '300px' }}>
      <LanguageSelector />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const languageButton = canvas.getByRole('button', { name: /language/i });
    await userEvent.click(languageButton);
    await expect(canvas.getByText('English')).toBeVisible();
    await expect(canvas.getByText('Français')).toBeVisible();
    await expect(canvas.getByText('Deutsch')).toBeVisible();
  },
};

export const ClosedByClickOutside: Story = {
  render: () => (
    <div className="bg-black p-4" style={{ height: '300px' }}>
      <div data-testid="outside" style={{ padding: '8px', color: 'white' }}>
        Outside area
      </div>
      <LanguageSelector />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const languageButton = canvas.getByRole('button', { name: /language/i });
    await userEvent.click(languageButton);
    await expect(canvas.getByText('English')).toBeVisible();
    await userEvent.click(canvas.getByTestId('outside'));
    await expect(canvas.queryByText('English')).not.toBeInTheDocument();
  },
};
