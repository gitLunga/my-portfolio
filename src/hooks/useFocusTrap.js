import { useEffect } from "react";

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "textarea:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

/**
 * Traps Tab/Shift+Tab within `containerRef` for as long as the owning
 * component is mounted, moves focus in on mount, and restores it on
 * unmount. Written for dialogs that mount/unmount rather than toggle a
 * visibility flag — e.g. `{selected && <Modal />}` — since that is the
 * pattern the one caller (the project detail popup) uses.
 *
 * `returnFocusRef`, if given, is preferred over "whatever had focus before
 * the dialog opened" when restoring focus. That matters here because the
 * trigger is a card in a filterable, animated grid — by the time the dialog
 * closes the specific button that was clicked may have been reflowed by a
 * filter change, so capturing it explicitly at open time is more reliable
 * than trusting `document.activeElement` to still resolve to the same node.
 */
export function useFocusTrap(containerRef, { returnFocusRef } = {}) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const previouslyFocused = document.activeElement;

    const getFocusable = () =>
      Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR)).filter(
        (el) => el.offsetParent !== null
      );

    const focusables = getFocusable();
    (focusables[0] || container).focus();

    const onKeyDown = (e) => {
      if (e.key !== "Tab") return;
      const items = getFocusable();
      if (items.length === 0) {
        e.preventDefault();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    container.addEventListener("keydown", onKeyDown);

    // Captured now, not read from the ref inside cleanup: by the time this
    // effect tears down, returnFocusRef.current could have been reassigned
    // to a different trigger (e.g. the user opened another dialog).
    const restoreTo = returnFocusRef?.current || previouslyFocused;

    return () => {
      container.removeEventListener("keydown", onKeyDown);
      if (restoreTo && document.contains(restoreTo)) {
        restoreTo.focus();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
