import * as React from 'react';

function LoginIcon({ fill = 'currentColor', ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      id="Groupe_8831"
      data-name="Groupe 8831"
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="14.361"
      viewBox="0 0 18 14.361"
      {...props}
    >
      <path
        id="Tracé_83958"
        data-name="Tracé 83958"
        d="M433.34,519.953a.745.745,0,0,0,1.053,1.053L437.2,518.2a.745.745,0,0,0,0-1.053l-2.809-2.809a.745.745,0,1,0-1.053,1.053l1.537,1.537h-8.133a.745.745,0,1,0,0,1.49h8.133Zm0,0"
        transform="translate(-426 -510.49)"
        fill={fill}
      />
      <path
        id="Tracé_83959"
        data-name="Tracé 83959"
        d="M554.193,426h-6.952A1.24,1.24,0,0,0,546,427.238v.99a.745.745,0,0,0,1.49,0v-.743h6.455v11.39H547.49v-.743a.745.745,0,0,0-1.49,0v.99a1.24,1.24,0,0,0,1.241,1.238h6.952a1.24,1.24,0,0,0,1.241-1.238V427.238A1.24,1.24,0,0,0,554.193,426Zm0,0"
        transform="translate(-537.434 -426)"
        fill={fill}
      />
    </svg>
  );
}

export default LoginIcon;
