import * as React from 'react';

function Delete({ fill = 'currentColor', ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="23.191" height="23.192" viewBox="0 0 23.191 23.192" {...props}>
      <g id="Groupe_9338" data-name="Groupe 9338" transform="translate(2550 -3810)">
        <path
          id="Ellipse_9430"
          data-name="Ellipse 9430"
          d="M10.141,2.434a7.707,7.707,0,1,0,7.707,7.707,7.716,7.716,0,0,0-7.707-7.707m0-2.434A10.141,10.141,0,1,1,0,10.141,10.141,10.141,0,0,1,10.141,0Z"
          transform="translate(-2547.091 3810)"
          fill={fill}
        />
        <path
          id="Ligne_340"
          data-name="Ligne 340"
          d="M-.5,5.023a1.065,1.065,0,0,1-.708-.261.821.821,0,0,1,0-1.258L4.13-1.239a1.091,1.091,0,0,1,1.415,0,.821.821,0,0,1,0,1.258L.208,4.762A1.065,1.065,0,0,1-.5,5.023Z"
          transform="translate(-2548.5 3828.169)"
          fill={fill}
        />
      </g>
    </svg>
  );
}

export default Delete;
