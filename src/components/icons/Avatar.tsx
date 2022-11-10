import * as React from 'react';

function SvgComponent({ fill = 'currentColor', ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17.363 19.161" {...props}>
      <defs>
        <style>
          {`.prefix__avatar{fill:none;stroke:${fill};stroke-linecap:round;stroke-linejoin:round;stroke-width:2px}`}
        </style>
      </defs>
      <g transform="translate(-1495.75 -2654.517)">
        <path
          className="prefix__avatar"
          d="M1512.113 2672.678v-2.045a3.975 3.975 0 00-3.841-4.1h-7.681a3.975 3.975 0 00-3.841 4.1v2.048"
        />
        <circle className="prefix__avatar" cx={4.539} cy={4.539} r={4.539} transform="translate(1499.892 2655.517)" />
      </g>
    </svg>
  );
}

export default SvgComponent;
