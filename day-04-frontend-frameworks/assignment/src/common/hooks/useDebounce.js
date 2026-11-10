import { useEffect, useState } from 'react';

export default function useDebounce(value, delay = 500) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer); // reset the timer on every keystroke
  }, [value, delay]);

  return debounced;
}