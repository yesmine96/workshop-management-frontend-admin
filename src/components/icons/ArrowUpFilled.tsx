import * as React from 'react';

function ArrowUpFilled({ fill = 'currentColor', ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 11.25" {...props}>
      <path
        d="M9 0a1.066 1.066 0 01.791.371l7.875 8.75A1.314 1.314 0 0118 10a1.2 1.2 0 01-1.125 1.25H1.125A1.2 1.2 0 010 10a1.314 1.314 0 01.334-.879L8.209.371A1.066 1.066 0 019 0z"
        fill={fill}
      />
    </svg>
  );
}

export default ArrowUpFilled;
