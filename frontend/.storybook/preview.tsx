import type { Preview } from '@storybook/react-vite';
import { StrictMode, useLayoutEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { initialize, mswLoader } from 'msw-storybook-addon';
import './preview.css';
import previewStyles from './preview.css?inline';
import { LikedArticlesProvider } from '../src/contexts/LikedArticlesContext';
import { mswHandlers, resetMswData } from './msw-handlers';

initialize({
  onUnhandledRequest: 'bypass',
});

const preview: Preview = {
  decorators: [
    (Story) => (
      <PreviewProviders>
        <Story />
      </PreviewProviders>
    ),
  ],
  loaders: [mswLoader],
  parameters: {
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
    resetMswData();
    localStorage.setItem('lang', 'en');
    localStorage.setItem('likedArticles', '[]');
  },
};

export default preview;

function PreviewProviders({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ownerDocument = rootRef.current?.ownerDocument;

    if (ownerDocument) {
      ensurePreviewStyles(ownerDocument);
    }
  }, []);

  return (
    <div ref={rootRef} style={{ display: 'contents' }}>
      <StrictMode>
        <LikedArticlesProvider>{children}</LikedArticlesProvider>
      </StrictMode>
    </div>
  );
}

function ensurePreviewStyles(ownerDocument: Document) {
  if (ownerDocument.getElementById('wikitok-preview-styles')) {
    return;
  }

  const style = ownerDocument.createElement('style');
  style.id = 'wikitok-preview-styles';
  style.textContent = previewStyles;
  ownerDocument.head.append(style);
}
