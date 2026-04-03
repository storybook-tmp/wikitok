import type { Meta, StoryObj } from '@storybook/react-vite';
import { LanguageSelector } from './LanguageSelector';
import { userEvent } from 'storybook/test';

const meta = {
  component: LanguageSelector,
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '1rem', background: '#000', minHeight: 300 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof LanguageSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <LanguageSelector />,
};

export const Open: Story = {
  render: () => <LanguageSelector />,
  async play({ canvas }) {
    const button = canvas.getByText('Language');
    await userEvent.click(button);
  },
};

export const FrenchSelected: Story = {
  async beforeEach() {
    localStorage.setItem('lang', 'fr');
  },
  render: () => <LanguageSelector />,
};
