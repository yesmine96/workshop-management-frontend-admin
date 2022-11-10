import * as React from 'react';

function ArrowUp({ fill = 'currentColor', ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 10.786" {...props}>
      <path
        d="M8.3.293L.288 8.463a1.021 1.021 0 000 1.423l.589.6a.972.972 0 001.393 0L9 3.624l6.73 6.869a.973.973 0 001.393 0l.59-.6a1.021 1.021 0 000-1.42L9.7.293a.98.98 0 00-1.4 0z"
        fill={fill}
      />
    </svg>
  );
}

export default ArrowUp;
