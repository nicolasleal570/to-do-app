import { useEffect } from 'react';

export default function useClickOutside(
  ref,
  handleClickOutsideCallback,
  disabled = false
) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (!disabled) {
        if (ref.current && !ref.current.contains(event.target)) {
          if (typeof handleClickOutsideCallback === 'function') {
            handleClickOutsideCallback(event);
          }
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, disabled, handleClickOutsideCallback]);
}
