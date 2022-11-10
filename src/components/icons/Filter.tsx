import * as React from 'react';

function Filter({ fill = 'currentColor', ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 19" {...props}>
      <path
        d="M10.158 16.793H1.051a.551.551 0 110-1.1h9.106a2.259 2.259 0 110 1.1zm5.5 0a3.4 3.4 0 000-1.1h2.288a.551.551 0 010 1.1zM4.464 10.051H1.051a.551.551 0 010-1.1h3.413a2.257 2.257 0 110 1.1zm5.5 0a3.352 3.352 0 000-1.1h7.982a.551.551 0 010 1.1zm.19-6.743H1.051a.551.551 0 010-1.1h9.106a2.259 2.259 0 110 1.1zm5.5 0a3.4 3.4 0 000-1.1h2.288a.551.551 0 010 1.1z"
        fill={fill}
        stroke={fill}
      />
    </svg>
  );
}

export default Filter;
