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

// Mock fetch to prevent actual Wikipedia API calls
globalThis.fetch = async (url: string | Request) => {
  const urlStr = typeof url === 'string' ? url : url.url;

  // Return mock Wikipedia API response
  if (urlStr.includes('wikipedia.org')) {
    return new Response(JSON.stringify({
      batchcomplete: true,
      query: {
        pages: {
          '23862': {
            pageid: 23862,
            title: 'Python',
            thumbnail: {
              source: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1200px-Python-logo-notext.svg.png',
              width: 200,
              height: 200,
            },
            extract: 'Python is a high-level programming language known for its simplicity and readability.',
            canonicalurl: 'https://en.wikipedia.org/wiki/Python_(programming_language)',
            varianttitles: {
              'en': 'Python (programming language)',
            },
          },
          '123': {
            pageid: 123,
            title: 'JavaScript',
            thumbnail: {
              source: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/220px-Unofficial_JavaScript_logo_2.svg.png',
              width: 200,
              height: 200,
            },
            extract: 'JavaScript is a versatile programming language primarily used for web development.',
            canonicalurl: 'https://en.wikipedia.org/wiki/JavaScript',
            varianttitles: {
              'en': 'JavaScript',
            },
          },
        },
      },
    }), { status: 200 });
  }

  // Default response
  return new Response(JSON.stringify({}), { status: 200 });
};

export const Default: Story = {
  render: () => <App />,
  play: async ({ canvas }) => {
    // Check that the WikiTok title is visible
    const title = canvas.getByText(/WikiTok/i);
    await expect(title).toBeVisible();

    // Check that the About button is visible
    const aboutButton = canvas.getByRole('button', { name: /About/i });
    await expect(aboutButton).toBeVisible();

    // Check that the Likes button is visible
    const likesButton = canvas.getByRole('button', { name: /Likes/i });
    await expect(likesButton).toBeVisible();

    // Check that the Language button is visible
    const languageButton = canvas.getByRole('button', { name: /Language/i });
    await expect(languageButton).toBeVisible();
  },
};

export const WithOpenAbout: Story = {
  render: () => <App />,
  play: async ({ canvas, userEvent }) => {
    // Open the About modal
    const aboutButton = canvas.getByRole('button', { name: /About/i });
    await userEvent.click(aboutButton);

    // Check that the About modal content is visible
    await waitFor(() => {
      const aboutTitle = canvas.getByText(/About WikiTok/i);
      expect(aboutTitle).toBeVisible();
    });

    // Check that the GitHub link is visible
    const githubLink = canvas.getByRole('link', { name: /GitHub/i });
    await expect(githubLink).toBeVisible();
  },
};

export const WithLikesPanel: Story = {
  beforeEach() {
    // Pre-populate some liked articles
    localStorage.setItem('likedArticles', JSON.stringify([
      {
        title: 'Python',
        displaytitle: 'Python (programming language)',
        extract: 'Python is a programming language.',
        pageid: 1,
        url: 'https://en.wikipedia.org/wiki/Python',
        thumbnail: {
          source: 'https://example.com/python.jpg',
          width: 200,
          height: 200,
        },
      },
    ]));
  },
  render: () => <App />,
  play: async ({ canvas, userEvent }) => {
    // Open the Likes panel
    const likesButton = canvas.getByRole('button', { name: /Likes/i });
    await userEvent.click(likesButton);

    // Check that the Liked Articles heading is visible
    await waitFor(() => {
      const likedTitle = canvas.getByText(/Liked Articles/i);
      expect(likedTitle).toBeVisible();
    });

    // Check that the liked article is displayed
    await waitFor(() => {
      const pythonTitle = canvas.getByRole('link', { name: /Python/i });
      expect(pythonTitle).toBeVisible();
    });

    // Check that the Export button is visible
    await waitFor(() => {
      const exportButton = canvas.getByRole('button', { name: /Export/i });
      expect(exportButton).toBeVisible();
    });
  },
};
