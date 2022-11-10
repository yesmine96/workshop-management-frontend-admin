import * as React from 'react';

function FavoriteFilled({ fill = 'currentColor', ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.01 18" {...props}>
      <path
        d="M13.468 0a5.48 5.48 0 00-2.518.6 5.587 5.587 0 00-1.445 1.065A5.59 5.59 0 008.06.6 5.481 5.481 0 005.542 0 5.548 5.548 0 000 5.542c0 2.165 3 5.416 5.259 7.785a733.43 733.43 0 003.868 4.078l.528.6.607-.6c1.584-1.664 3.4-3.552 5.281-5.53 2.254-2.369 3.467-4.168 3.467-6.333A5.548 5.548 0 0013.468 0zm0 0"
        fill={fill}
      />
    </svg>
  );
}

export default FavoriteFilled;
