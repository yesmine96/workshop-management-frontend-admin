import * as React from 'react';

function ArrowLeft({ fill = 'currentColor', ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10.786 18" {...props}>
      <path
        d="M.293 8.3L8.463.288a1.021 1.021 0 011.42 0l.6.59a.972.972 0 010 1.393L3.625 9l6.869 6.734a.973.973 0 010 1.393l-.6.59a1.021 1.021 0 01-1.42 0L.293 9.7a.98.98 0 010-1.4z"
        fill={fill}
      />
    </svg>
  );
}

export default ArrowLeft;
