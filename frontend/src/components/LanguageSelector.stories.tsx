import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { LanguageSelector } from './LanguageSelector';

const meta: Meta<typeof LanguageSelector> = {
  component: LanguageSelector,
  tags: ['ai-generated'],
  decorators: [
    (Story) => (
      <div style={{ padding: '2rem', background: '#000', minHeight: '400px', display: 'flex', justifyContent: 'flex-end' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof LanguageSelector>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Language')).toBeVisible();
  },
};

export const Opened: Story = {
  play: async ({ canvas, userEvent }) => {
    const languageButton = canvas.getByText('Language');
    await userEvent.click(languageButton);
    await expect(canvas.getByText('English')).toBeVisible();
    await expect(canvas.getByText('Français')).toBeVisible();
    await expect(canvas.getByText('Deutsch')).toBeVisible();
  },
};

export const CloseOnSecondClick: Story = {
  play: async ({ canvas, userEvent }) => {
    const languageButton = canvas.getByText('Language');
    await userEvent.click(languageButton);
    await expect(canvas.getByText('English')).toBeVisible();
    await userEvent.click(languageButton);
    await expect(canvas.queryByText('English')).not.toBeInTheDocument();
  },
};
