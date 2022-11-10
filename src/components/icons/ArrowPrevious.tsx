import * as React from 'react';

function ArrowPrevious({ fill = 'currentColor', ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 13.022" {...props}>
      <path
        d="M1.151 7.822l6.611 4.471a1.129 1.129 0 001.3 0 1.574 1.574 0 00.651-1.322V7.638a1.364 1.364 0 00.218.184l6.614 4.471a1.129 1.129 0 001.3 0 1.574 1.574 0 00.655-1.322V2.029a1.574 1.574 0 00-.651-1.322A1.158 1.158 0 0017.2.5a1.158 1.158 0 00-.651.207L9.935 5.178a1.354 1.354 0 00-.218.184V2.029A1.574 1.574 0 009.066.707a1.129 1.129 0 00-1.3 0L1.155 5.178A1.574 1.574 0 00.5 6.5a1.574 1.574 0 00.651 1.322z"
        fill={fill}
        stroke={fill}
      />
    </svg>
  );
}

export default ArrowPrevious;
