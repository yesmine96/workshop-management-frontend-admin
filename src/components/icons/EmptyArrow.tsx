import * as React from 'react';

function EmptyArrow({ fill = 'currentColor', ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" {...props}>
      <g fill="none">
        <path d="M17.042 7.451a1.732 1.732 0 010 3.1L2.507 17.817A1.733 1.733 0 010 16.266V1.734A1.733 1.733 0 012.507.185z" />
        <path
          d="M15.669 9L2 2.167v13.666L15.669 9M18 9c0 .615-.32 1.23-.958 1.55L2.507 17.814A1.733 1.733 0 010 16.265V1.736A1.733 1.733 0 012.507.184l14.535 7.266C17.681 7.77 18 8.385 18 9z"
          fill={fill}
        />
      </g>
    </svg>
  );
}

export default EmptyArrow;
