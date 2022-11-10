import * as React from 'react';

function ArrowPreviousLeft({ fill = 'currentColor', ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11.25 18" {...props}>
      <path
        d="M0 9a1.066 1.066 0 01.371-.791L9.121.334A1.314 1.314 0 0110 0a1.2 1.2 0 011.25 1.125v15.75A1.2 1.2 0 0110 18a1.314 1.314 0 01-.879-.334L.371 9.791A1.066 1.066 0 010 9z"
        fill={fill}
      />
    </svg>
  );
}

export default ArrowPreviousLeft;
