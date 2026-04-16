import type { Meta, StoryContext, StoryObj } from '@storybook/react-vite';
import { userEvent, within } from 'storybook/test';
import { LanguageSelector } from './LanguageSelector';

const meta = {
  component: LanguageSelector,
} satisfies Meta<typeof LanguageSelector>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <TopBarShell />,
};

export const Open: Story = {
  render: () => <TopBarShell />,
  play: async (context) => {
    await openDropdown(context);
  },
};

async function openDropdown(context: StoryContext<typeof meta>) {
  const canvas = within(context.canvasElement);

  await userEvent.click(canvas.getByRole('button', { name: 'Language' }));
  await canvas.findByRole('button', { name: /English/i });
}

function TopBarShell() {
  return (
    <div className="relative bg-black text-white overflow-hidden" style={{ width: 393, height: 852 }}>
      <div className="absolute top-4 left-4 z-50">
        <button className="text-2xl font-bold text-white drop-shadow-lg hover:opacity-80 transition-opacity">
          WikiTok
        </button>
      </div>

      <div className="absolute top-4 right-4 z-50 flex flex-col items-end gap-2">
        <button className="text-sm text-white/70 hover:text-white transition-colors">About</button>
        <button className="text-sm text-white/70 hover:text-white transition-colors">Likes</button>
        <LanguageSelector />
      </div>
    </div>
  );
}
