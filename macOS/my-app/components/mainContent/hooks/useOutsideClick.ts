import { useEffect, RefObject } from 'react';

/**
 * Custom hook to detect clicks outside of a referenced element.
 * @param ref - The ref to the element you want to monitor for outside clicks.
 * @param handler - The function to call when an outside click is detected.
 */
const useOutsideClick = (
  ref: RefObject<HTMLElement>,
  handler: () => void
): void => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        console.log('outside clicked');
        handler();
      } else console.log('inside the ref element ');
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, handler]);
};

export default useOutsideClick;
