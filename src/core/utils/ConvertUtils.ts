export function convertToInputElement(element: HTMLElement | null): HTMLInputElement | null {
  if (!element) return null;

  return element as HTMLInputElement;
}