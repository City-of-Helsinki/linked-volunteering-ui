// Whether nothing on the page has focus, for example because the focused
// element was removed together with the previous page
export const isFocusLost = () =>
  !document.activeElement || document.activeElement === document.body;

// Focuses an element that is not focusable by default, such as a heading
export const focusElement = (element: HTMLElement) => {
  if (!element.hasAttribute('tabindex')) {
    element.setAttribute('tabindex', '-1');
  }

  element.focus();
};
