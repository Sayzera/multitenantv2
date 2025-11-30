import { RefObject } from "react";

export const useDropdownPosition = (
  ref: RefObject<HTMLDivElement | null> | RefObject<HTMLDivElement>
) => {
  const getDropdownPosition = () => {
    if (!ref.current) return { top: 0, left: 0 };
    const rect = ref.current.getBoundingClientRect();
    const dropdownWith = 240;

    let left = rect.left
    const top = rect.bottom
    
    if (left + dropdownWith > window.innerWidth) {
      left = rect.right + window.scrollX - dropdownWith;

      if (left < 0) {
        left = window.innerWidth - dropdownWith - 16;
      }
    }

    // ensure dropdown doesn't go off left edge

    if (left < 0) {
      left = 16;
    }

    return {
      top,
      left,
    };
  };

  return {
    getDropdownPosition,
  };
};
