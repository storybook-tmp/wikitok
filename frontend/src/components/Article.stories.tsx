import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import Article from './Article';

const meta = {
  component: Article,
} satisfies Meta<typeof Article>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Getting Started with React',
    content: 'React is a JavaScript library for building user interfaces with reusable components.',
  },
  play: async ({ canvas }) => {
    // Check that title is visible
    const title = canvas.getByRole('heading', { name: /Getting Started with React/i });
    await expect(title).toBeVisible();

    // Check that content is visible
    const content = canvas.getByText(/React is a JavaScript library/i);
    await expect(content).toBeVisible();
  },
};

export const WithImage: Story = {
  args: {
    title: 'Article with Image',
    content: 'This article includes an image.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Camponotus_flavomarginatus_ant.jpg/320px-Camponotus_flavomarginatus_ant.jpg',
  },
  play: async ({ canvas }) => {
    // Check that title is visible
    const title = canvas.getByRole('heading', { name: /Article with Image/i });
    await expect(title).toBeVisible();

    // Check that image is visible
    const image = canvas.getByRole('img', { name: /Article with Image/i });
    await expect(image).toBeVisible();

    // Check that content is visible
    const content = canvas.getByText(/This article includes an image/i);
    await expect(content).toBeVisible();
  },
};

export const LongContent: Story = {
  args: {
    title: 'The History of Programming Languages',
    content: 'Programming languages have evolved significantly over the decades. Starting from machine code and assembly language, developers have created increasingly abstract and user-friendly languages. Today, we have languages designed for different purposes - from low-level systems programming with C and Rust, to high-level data science with Python, to web development with JavaScript and TypeScript.',
  },
  play: async ({ canvas }) => {
    // Check that the long content is properly displayed
    const content = canvas.getByText(/Programming languages have evolved/i);
    await expect(content).toBeVisible();

    // Check that all parts of the content are visible
    await expect(canvas.getByText(/machine code and assembly language/i)).toBeVisible();
    await expect(canvas.getByText(/web development with JavaScript/i)).toBeVisible();
  },
};
