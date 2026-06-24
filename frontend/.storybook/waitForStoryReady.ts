import { waitFor } from 'storybook/test';

export async function waitForStoryReady(canvasElement: HTMLElement) {
  await waitFor(
    () => {
      const doc = canvasElement.ownerDocument;
      const root = canvasElement.firstElementChild as HTMLElement | null;
      if (!root) {
        throw new Error('Story root is missing.');
      }

      if (doc.body.classList.contains('sb-show-preparing-story')) {
        throw new Error('Storybook is still preparing the story.');
      }

      const style = getComputedStyle(root);
      const rect = root.getBoundingClientRect();
      const isVisible =
        rect.width > 0 &&
        rect.height > 0 &&
        style.display !== 'none' &&
        style.visibility !== 'hidden' &&
        Number(style.opacity) > 0;

      if (!isVisible) {
        throw new Error('Story root is not visible yet.');
      }
    },
    { timeout: 3000 },
  );
}
