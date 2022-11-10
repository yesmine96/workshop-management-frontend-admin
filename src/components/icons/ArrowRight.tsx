import * as React from 'react';

function ArrowRight({ fill = 'currentColor', ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10.786 18" {...props}>
      <path
        d="M10.493 8.3L2.323.288A1.021 1.021 0 00.9.288L.3.877a.972.972 0 000 1.393L7.162 9 .293 15.73a.973.973 0 000 1.393l.6.59a1.021 1.021 0 001.42 0l8.18-8.013a.98.98 0 000-1.4z"
        fill={fill}
      />
    </svg>
  );
}

export default ArrowRight;
