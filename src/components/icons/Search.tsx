import * as React from 'react';

function Search({ fill = 'currentColor', ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20.414 20.414" {...props}>
      <defs>
        <style>
          {`.prefix__a_search{fill:none;stroke:${fill};stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;stroke-width:2px}`}
        </style>
      </defs>
      <g transform="translate(1 1)">
        <circle className="prefix__a_search" cx={8} cy={8} r={8} />
        <path className="prefix__a_search" d="M18 18l-4.35-4.35" />
      </g>
    </svg>
  );
}

export default Search;
