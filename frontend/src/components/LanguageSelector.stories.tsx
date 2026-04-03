import type { Meta, StoryObj } from '@storybook/react-vite';
import { LanguageSelector } from './LanguageSelector';

const meta = {
  component: LanguageSelector,
  decorators: [
    (Story) => (
      <div style={{ background: 'black', padding: '1rem', display: 'flex', justifyContent: 'flex-end', color: 'white' }}>
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
