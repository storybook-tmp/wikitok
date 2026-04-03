import type { Preview } from '@storybook/react-vite';
import { StrictMode, useRef, type ReactNode } from 'react';
import { initialize, mswLoader } from 'msw-storybook-addon';
import type { WikiArticle } from '../src/components/WikiCard';
import { LikedArticlesProvider } from '../src/contexts/LikedArticlesContext';
import '../src/index.css';
import { mswHandlers, resetStorybookMocks } from './msw-handlers';

initialize({
  onUnhandledRequest: 'bypass',
  quiet: true,
});

if (navigator.userAgent.includes('Playwright')) {
  console.log = () => undefined;
}

const preview: Preview = {
  decorators: [
    (Story, context) => (
      <StorybookAppShell appState={context.parameters.appState as StorybookAppState | undefined}>
        <Story />
      </StorybookAppShell>
    ),
  ],
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
  async beforeEach() {
    resetStorybookMocks();
    localStorage.clear();
    sessionStorage.clear();
  },
};

export default preview;

interface StorybookAppState {
  langId?: string;
  likedArticles?: WikiArticle[];
}

function StorybookAppShell({
  children,
  appState,
}: {
  children: ReactNode;
  appState?: StorybookAppState;
}) {
  const hasSeededState = useRef(false);

  if (!hasSeededState.current) {
    seedBrowserState(appState);
    hasSeededState.current = true;
  }

  return (
    <StrictMode>
      <LikedArticlesProvider>{children}</LikedArticlesProvider>
    </StrictMode>
  );
}

function seedBrowserState(appState?: StorybookAppState) {
  localStorage.setItem('lang', appState?.langId ?? 'en');
  localStorage.setItem('likedArticles', JSON.stringify(appState?.likedArticles ?? []));
}
