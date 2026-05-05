import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';
import App from './App';

const meta = {
  component: App,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof App>;

export default meta;
type Story = StoryObj<typeof meta>;

// Mock fetch for Wikipedia API
globalThis.fetch = async (url: string | Request) => {
  const urlStr = typeof url === 'string' ? url : url.url;

  if (urlStr.includes('wikipedia.org')) {
    return new Response(JSON.stringify({
      batchcomplete: true,
      query: {
        pages: {
          '1': {
            pageid: 1,
            title: 'Article 1',
            thumbnail: {
              source: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Camponotus_flavomarginatus_ant.jpg/320px-Camponotus_flavomarginatus_ant.jpg',
              width: 200,
              height: 200,
            },
            extract: 'First article description.',
            canonicalurl: 'https://en.wikipedia.org/wiki/Article1',
            varianttitles: { en: 'Article 1' },
          },
        },
      },
    }), { status: 200 });
  }

  return new Response(JSON.stringify({}), { status: 200 });
};

export const Navigation: Story = {
  render: () => <App />,
  play: async ({ canvas, userEvent }) => {
    // Click About button
    const aboutButton = canvas.getByRole('button', { name: /About/i });
    await userEvent.click(aboutButton);

    // Verify modal opened
    await waitFor(() => {
      const aboutTitle = canvas.getByText(/About WikiTok/i);
      expect(aboutTitle).toBeVisible();
    });

    // Close the modal by clicking the close button
    const closeButton = canvas.getAllByText('✕')[0];
    await userEvent.click(closeButton);

    // Modal should be closed
    await expect(canvas.queryByText(/About WikiTok/i)).not.toBeInTheDocument();
  },
};

export const EmptyLikes: Story = {
  beforeEach() {
    localStorage.setItem('likedArticles', '[]');
  },
  render: () => <App />,
  play: async ({ canvas, userEvent }) => {
    // Open likes
    const likesButton = canvas.getByRole('button', { name: /Likes/i });
    await userEvent.click(likesButton);

    // Check for empty state message
    await waitFor(() => {
      const emptyMessage = canvas.getByText(/No liked articles yet/i);
      expect(emptyMessage).toBeVisible();
    });

    // Export button should not be visible when no articles
    const exportButton = canvas.queryByRole('button', { name: /Export/i });
    await expect(exportButton).not.toBeInTheDocument();
  },
};

export const SearchLikes: Story = {
  beforeEach() {
    localStorage.setItem('likedArticles', JSON.stringify([
      {
        title: 'Python Programming',
        displaytitle: 'Python Programming',
        extract: 'Learn Python programming language.',
        pageid: 1,
        url: 'https://en.wikipedia.org/wiki/Python',
        thumbnail: {
          source: 'https://example.com/python.jpg',
          width: 200,
          height: 200,
        },
      },
      {
        title: 'JavaScript Guide',
        displaytitle: 'JavaScript Guide',
        extract: 'Master JavaScript for web development.',
        pageid: 2,
        url: 'https://en.wikipedia.org/wiki/JavaScript',
        thumbnail: {
          source: 'https://example.com/js.jpg',
          width: 200,
          height: 200,
        },
      },
    ]));
  },
  render: () => <App />,
  play: async ({ canvas, userEvent }) => {
    // Open likes
    const likesButton = canvas.getByRole('button', { name: /Likes/i });
    await userEvent.click(likesButton);

    // Wait for articles to appear
    await waitFor(() => {
      const pythonLink = canvas.getByRole('link', { name: /Python/i });
      expect(pythonLink).toBeVisible();
    });

    // Search for Python
    const searchInput = canvas.getByPlaceholderText(/Search liked articles/i);
    await userEvent.type(searchInput, 'Python');

    // Python should still be visible
    const pythonLink = canvas.getByRole('link', { name: /Python/i });
    await expect(pythonLink).toBeVisible();

    // JavaScript should not be visible
    await expect(canvas.queryByRole('link', { name: /JavaScript/i })).not.toBeInTheDocument();
  },
};

export const ExportFunctionality: Story = {
  beforeEach() {
    localStorage.setItem('likedArticles', JSON.stringify([
      {
        title: 'Test Article',
        displaytitle: 'Test Article',
        extract: 'Test article for export.',
        pageid: 1,
        url: 'https://en.wikipedia.org/wiki/Test',
        thumbnail: {
          source: 'https://example.com/test.jpg',
          width: 200,
          height: 200,
        },
      },
    ]));
  },
  render: () => <App />,
  play: async ({ canvas, userEvent }) => {
    // Open likes
    const likesButton = canvas.getByRole('button', { name: /Likes/i });
    await userEvent.click(likesButton);

    // Wait for content
    await waitFor(() => {
      const testLink = canvas.getByRole('link', { name: /Test Article/i });
      expect(testLink).toBeVisible();
    });

    // Export button should be visible
    const exportButton = canvas.getByRole('button', { name: /Export/i });
    await expect(exportButton).toBeVisible();

    // Export button should be clickable (we won't actually download)
    await expect(exportButton).toBeEnabled();
  },
};
