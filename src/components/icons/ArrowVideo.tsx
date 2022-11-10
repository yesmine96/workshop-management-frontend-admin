import * as React from 'react';

function SvgComponent({ fill = 'currentColor', ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" {...props}>
      <defs>
        <style>{`.prefix__b_videoo{stroke:${fill};fill:transparent;}`}</style>
      </defs>
      <g fill="none">
        <path
          d="M13.528 9L2 3.236v11.528L13.528 9m2 0c0 .71-.369 1.42-1.106 1.789L2.894 16.553A2 2 0 010 14.763V3.237a2 2 0 012.894-1.789l11.528 5.764A1.977 1.977 0 0115.528 9z"
          fill={fill}
        />
      </g>
    </svg>
  );
}

export default SvgComponent;
