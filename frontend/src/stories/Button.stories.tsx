import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';
import { Button } from './Button';

const meta = {
  title: 'Example/Button',
  component: Button,
  tags: ['ai-generated'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 'Button',
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: /button/i });
    await expect(button).toBeVisible();
    await expect(button.className).toContain('storybook-button--primary');
  },
};

export const Secondary: Story = {
  args: {
    label: 'Button',
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: /button/i });
    await expect(button).toBeVisible();
    await expect(button.className).toContain('storybook-button--secondary');
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    label: 'Button',
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: /button/i });
    await expect(button).toBeVisible();
    await expect(button.className).toContain('storybook-button--large');
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    label: 'Button',
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: /button/i });
    await expect(button).toBeVisible();
    await expect(button.className).toContain('storybook-button--small');
  },
};

export const ClickHandler: Story = {
  args: {
    primary: true,
    label: 'Click Me',
  },
  play: async ({ canvas, userEvent, args }) => {
    const button = canvas.getByRole('button', { name: /click me/i });
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledOnce();
  },
};
