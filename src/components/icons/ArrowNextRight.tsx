import * as React from 'react';

function ArrowNextRight({ fill = 'currentColor', ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12.25 19" {...props}>
      <path
        d="M11.75 9.5a1.066 1.066 0 01-.371.791l-8.75 7.875a1.314 1.314 0 01-.879.334A1.2 1.2 0 01.5 17.375V1.625A1.2 1.2 0 011.75.5a1.314 1.314 0 01.879.334l8.75 7.875a1.066 1.066 0 01.371.791z"
        fill={fill}
        stroke={fill}
      />
    </svg>
  );
}

export default ArrowNextRight;
