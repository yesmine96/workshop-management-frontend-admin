import * as React from 'react';

function ArrowDown({ fill = 'currentColor', ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 10.786" {...props}>
      <path
        d="M8.3 10.493L.288 2.323a1.021 1.021 0 010-1.42l.59-.6a.972.972 0 011.393 0L9 7.161 15.734.292a.973.973 0 011.393 0l.59.6a1.021 1.021 0 010 1.42L9.7 10.493a.98.98 0 01-1.4 0z"
        fill={fill}
      />
    </svg>
  );
}

export default ArrowDown;
