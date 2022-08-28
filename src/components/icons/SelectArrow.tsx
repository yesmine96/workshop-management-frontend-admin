import * as React from 'react';

function SelectArrow({ fill = 'currentColor', ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={9.588} {...props}>
      <path
        // eslint-disable-next-line
        d="M7.376 9.328L.256 2.065a.907.907 0 010-1.263L.78.268a.864.864 0 011.238 0L8 6.366 13.986.261a.865.865 0 011.238 0l.524.535a.907.907 0 010 1.263l-7.13 7.269a.871.871 0 01-1.242 0z"
        fill={fill}
      />
    </svg>
  );
}

export default SelectArrow;
