import * as React from 'react';

function ReturnIcon2({ fill = 'currentColor', ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18.888 14.488" {...props}>
      <defs>
        <style>{`.returnSVG2{fill:none;stroke:${fill};stroke-linecap:round;stroke-width:2px;}`}</style>
      </defs>
      <g transform="translate(-39.045 -34.087)">
        <path className="returnSVG2" d="M0,0,6.361,5.831,0,11.662" transform="translate(46.886 47.162) rotate(180)" />
        <line className="returnSVG2" x2="16.433" transform="translate(40.5 41.331)" />
      </g>
    </svg>
  );
}

export default ReturnIcon2;
