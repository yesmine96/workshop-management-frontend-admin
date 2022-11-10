import * as React from 'react';

function Edit({ fill = 'currentColor', ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 18 18" {...props}>
      <defs>
        <clipPath id="prefix__a_edit">
          <path className="prefix__a_edit" d="M0 0h18v18H0z" />
        </clipPath>
        <style>{`.prefix__a_edit{fill:${fill}}`}</style>
      </defs>
      <g clipPath="url(#prefix__a_edit)">
        <path
          className="prefix__a_edit"
          d="M17.753 2.54L15.46.247a1.612 1.612 0 00-1.146-.474 1.609 1.609 0 00-1.146.474L1.476 11.939a.8.8 0 00-.164.325l-1.5 5.26a.54.54 0 00.52.689.531.531 0 00.149-.021l5.257-1.5a1.124 1.124 0 00.328-.164L17.758 4.836a1.623 1.623 0 000-2.293zM1.115 16.885l1.009-3.532 2.523 2.523zm4.564-1.506l-3.058-3.058 9.4-9.4 3.058 3.058zM16.987 4.072L15.84 5.219l-3.053-3.062 1.147-1.147a.535.535 0 01.381-.157.537.537 0 01.382.158l2.293 2.293a.541.541 0 010 .764zm0 0"
        />
      </g>
    </svg>
  );
}

export default Edit;
