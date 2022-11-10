import * as React from 'react';

function Plus({ fill = 'currentColor', ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill={fill} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20.5 20.5" {...props}>
      <g fill={fill} stroke={fill} strokeLinecap="round" strokeWidth={2.5}>
        <path data-name="Ligne 176" d="M10.25 1.25v18" />
        <path data-name="Ligne 177" d="M19.25 10.22h-18" />
      </g>
    </svg>
  );
}

export default Plus;
