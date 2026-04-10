import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { LanguageSelector } from './LanguageSelector';

const meta = {
  component: LanguageSelector,
} satisfies Meta<typeof LanguageSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <LanguageSelectorShell />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByRole('button', { name: 'Language' })).toBeVisible();
  },
};

export const Opened: Story = {
  render: () => <LanguageSelectorShell />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole('button', { name: 'Language' }));

    await expect(canvas.getByText('English')).toBeVisible();
    await expect(canvas.getByText('Deutsch')).toBeVisible();
  },
};

export const ClosesOnOutsideClick: Story = {
  render: () => <LanguageSelectorShell />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole('button', { name: 'Language' }));
    await expect(canvas.getByText('English')).toBeVisible();

    await userEvent.click(canvasElement.ownerDocument.body);

    await waitFor(() => {
      expect(canvas.queryByText('English')).not.toBeInTheDocument();
    });
  },
};

function LanguageSelectorShell() {
  return (
    <div className="w-full bg-black p-4 text-white" style={{ minHeight: '100vh' }}>
      <div className="flex justify-end">
        <div className="flex flex-col items-end gap-2">
          <LanguageSelector />
        </div>
      </div>
    </div>
  );
}
