import * as React from 'react';

function ArrowNextLeft({ fill = 'currentColor', ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12.25 19" {...props}>
      <path
        d="M.5 9.5a1.066 1.066 0 01.371-.791L9.621.834A1.314 1.314 0 0110.5.5a1.2 1.2 0 011.25 1.125v15.75A1.2 1.2 0 0110.5 18.5a1.314 1.314 0 01-.879-.334l-8.75-7.875A1.066 1.066 0 01.5 9.5z"
        fill={fill}
        stroke={fill}
      />
    </svg>
  );
}

export default ArrowNextLeft;
