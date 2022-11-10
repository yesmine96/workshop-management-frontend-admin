import * as React from 'react';

function Stop({ fill = 'currentColor', ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 19" {...props}>
      <rect
        width={18}
        height={18}
        rx={2}
        transform="translate(.5 .5)"
        fill={fill}
        stroke={fill}
        strokeMiterlimit={10}
      />
    </svg>
  );
}

export default Stop;
