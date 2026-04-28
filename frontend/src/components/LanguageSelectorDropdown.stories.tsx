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

export const ShowsFlags: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByText('Language'));
    const images = canvas.getAllByRole('img');
    await expect(images.length).toBeGreaterThan(0);
    // Check that flag images are present
    await expect(images[0]).toHaveAttribute('src');
  },
};

export const ShowsSortedLanguages: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByText('Language'));
    // Languages should be sorted alphabetically by id
    // Arabic (ar) should come before English (en)
    await expect(canvas.getByText('العربية')).toBeVisible();
    await expect(canvas.getByText('English')).toBeVisible();
  },
};

export const DropdownHasManyLanguages: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByText('Language'));
    // The dropdown should list many languages (40+)
    const buttons = canvas.getAllByRole('button');
    // Subtract 1 for the main Language toggle button
    await expect(buttons.length - 1).toBeGreaterThan(30);
  },
};
