import { Header } from 'components/data-display/Table';
import { useEffect, useState } from 'react';

interface useResponsiveTableProps extends Header<any> {
  disableWhenSize?: string;
}
const useResponsiveTable = (header: useResponsiveTableProps[]) => {
  const [size, setsize] = useState<number>(window.innerWidth);
  const [responsiveTable, setResponsiveTable] = useState<Header<any>[]>([]);
  window.addEventListener('resize', function (event) {
    setsize(window.innerWidth);
  });

  const breakpoints: Record<string, number> = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
  };

  useEffect(() => {
    const preHeader: Header<any>[] = [];

    header.map(({ disableWhenSize, ...item }) => {
      if (disableWhenSize) {
        if (breakpoints[String(disableWhenSize)] < size) {
          preHeader.push(item);
        }
      } else {
        preHeader.push(item);
      }
    });

    setResponsiveTable(preHeader);
  }, [size]);
  return { responsiveTable };
};

export { useResponsiveTable };
