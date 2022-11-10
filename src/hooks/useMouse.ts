import { useRef, useState, useEffect } from 'react';

export default function useMouse(): [boolean, () => void, () => void] {
  const timer = useRef<NodeJS.Timeout | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  function onMouseEnter() {
    setOpen(true);
    if (timer.current) clearTimeout(timer.current);
  }
  function onMouseLeave() {
    timer.current = setTimeout(() => {
      setOpen(false);
    }, 200);
  }

  return [open, onMouseEnter, onMouseLeave];
}
