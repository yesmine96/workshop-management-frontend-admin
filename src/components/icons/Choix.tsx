import * as React from 'react';

function Choix({ fill = 'currentColor', ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24.319" height="34.476" viewBox="0 0 24.319 34.476" {...props}>
      <path
        id="Tracé_84122"
        data-name="Tracé 84122"
        d="M97.893,96.649a3.722,3.722,0,0,0,3.654,2.927h15.012V87.161h-8.007l-4.207-18.554-1.3.294-.862-3.8L92.4,67.319l.861,3.8-1.025.233Zm15.148-7.538h1.567v7.954h-1.567Zm-6.047,0h4.1v8.515h-9.544a1.784,1.784,0,0,1-1.751-1.4l-5.23-23.4,7.237-1.641,1.07-.242Zm-6.28-21.677.431,1.9-5.978,1.356-.431-1.9Z"
        transform="translate(-92.24 -65.101)"
        fill={fill}
      />
    </svg>
  );
}

export default Choix;
