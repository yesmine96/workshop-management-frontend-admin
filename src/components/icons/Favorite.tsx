import * as React from 'react';

function Favorite({ fill = 'currentColor', ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="26.254" height="24.467" viewBox="0 0 26.254 24.467" {...props}>
      <path
        id="Tracé_84034"
        data-name="Tracé 84034"
        d="M35.332,34.13h0a6.926,6.926,0,0,0-5.06,2.2l-.446.471-.446-.471a6.905,6.905,0,0,0-9.759-.358q-.186.173-.358.358a7.745,7.745,0,0,0,0,10.531l9.908,10.449a.9.9,0,0,0,1.276.035l.035-.035,9.9-10.449a7.744,7.744,0,0,0,0-10.53A6.918,6.918,0,0,0,35.332,34.13ZM39.08,45.623l-9.253,9.759-9.254-9.759a5.918,5.918,0,0,1,0-8.046,5.1,5.1,0,0,1,7.208-.29q.151.139.29.29l1.1,1.161a.93.93,0,0,0,1.31,0l1.1-1.16a5.1,5.1,0,0,1,7.208-.29q.151.139.29.29h0a5.864,5.864,0,0,1,0,8.045Z"
        transform="translate(-16.698 -33.629)"
        fill={fill}
        stroke={fill}
        strokeWidth="1"
      />
    </svg>
  );
}

export default Favorite;
