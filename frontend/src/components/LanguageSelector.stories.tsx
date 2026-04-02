import type { Meta, StoryObj } from '@storybook/react-vite';
import { LanguageSelector } from './LanguageSelector';

const meta = {
  title: 'AI Generated/Complex/LanguageSelector',
  component: LanguageSelector,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: '#000', padding: '40px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof LanguageSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithPadding: Story = {
  decorators: [
    (Story) => (
      <div style={{ padding: '100px' }}>
        <Story />
      </div>
    ),
  ],
};
