import type { Meta, StoryObj } from '@storybook/react-vite';
import { LanguageSelector } from './LanguageSelector';

const meta = {
  title: 'AI Generated/Complex/LanguageSelector',
  component: LanguageSelector,
  decorators: [
    (Story) => (
      <div style={{ padding: '20px', background: '#000', minHeight: '300px', display: 'flex', justifyContent: 'flex-end' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof LanguageSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Opened: Story = {
  play: async ({ canvasElement }) => {
    const button = canvasElement.querySelector('button');
    button?.click();
  },
};
