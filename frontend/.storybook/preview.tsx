import { StrictMode } from 'react';
import type { Decorator, Preview } from '@storybook/react-vite';
import MockDate from 'mockdate';
import { initialize, mswLoader } from 'msw-storybook-addon';
import { LikedArticlesProvider } from '../src/contexts/LikedArticlesContext';
import '../src/index.css';
import '../src/styles/Article.css';
import { mswHandlers, resetMswState } from './msw-handlers';
import { defaultMockDate, serializeLikedArticles } from './wiki-fixtures';

initialize({
  onUnhandledRequest: 'bypass',
  quiet: true,
});

type StoryRuntime = {
  localStorage?: Record<string, string>;
  mockDate?: string;
};

const defaultRuntime: Required<StoryRuntime> = {
  localStorage: {
    lang: 'en',
    likedArticles: serializeLikedArticles([]),
  },
  mockDate: defaultMockDate,
};

let seededStoryId: string | null = null;

const withAppRuntime: Decorator = (Story, context) => {
  seedRuntime(context.id, context.parameters.runtime as StoryRuntime | undefined);

  return (
    <StrictMode>
      <LikedArticlesProvider>
        <Story />
      </LikedArticlesProvider>
    </StrictMode>
  );
};

const preview: Preview = {
  decorators: [withAppRuntime],
  loaders: [mswLoader],
  parameters: {
    layout: 'fullscreen',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
    msw: {
      handlers: mswHandlers,
    },
  },
};

export default preview;

function seedRuntime(storyId: string, runtime: StoryRuntime | undefined) {
  if (seededStoryId === storyId) {
    return;
  }

  seededStoryId = storyId;

  sessionStorage.clear();
  localStorage.clear();
  resetMswState();

  MockDate.set(runtime?.mockDate ?? defaultRuntime.mockDate);
  seedLocalStorage(defaultRuntime.localStorage);
  seedLocalStorage(runtime?.localStorage);
}

function seedLocalStorage(entries?: Record<string, string>) {
  if (!entries) {
    return;
  }

  for (const [key, value] of Object.entries(entries)) {
    localStorage.setItem(key, value);
  }
}
