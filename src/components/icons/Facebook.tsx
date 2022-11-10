import * as React from 'react';

function Facebook({ fill = 'currentColor', ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9.368 17.326" {...props}>
      <path
        d="M9.015 0H6.768a3.946 3.946 0 00-4.156 4.264V6.23H.353A.353.353 0 000 6.583v2.849a.353.353 0 00.353.353h2.259v7.188a.353.353 0 00.353.353h2.948a.353.353 0 00.353-.353V9.785h2.641a.353.353 0 00.353-.353V6.584a.354.354 0 00-.353-.353h-2.64V4.563c0-.8.191-1.208 1.234-1.208h1.514A.353.353 0 009.368 3V.357A.353.353 0 009.015 0z"
        fill={fill}
      />
    </svg>
  );
}

export default Facebook;
