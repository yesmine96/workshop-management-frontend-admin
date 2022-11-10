import * as React from 'react';

function ArrowDownFilled({ fill = 'currentColor', ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 11.25" {...props}>
      <path
        d="M9 11.25a1.066 1.066 0 01-.791-.371L.334 2.129A1.314 1.314 0 010 1.25 1.2 1.2 0 011.125 0h15.75A1.2 1.2 0 0118 1.25a1.314 1.314 0 01-.334.879l-7.875 8.75A1.066 1.066 0 019 11.25z"
        fill={fill}
      />
    </svg>
  );
}

export default ArrowDownFilled;
