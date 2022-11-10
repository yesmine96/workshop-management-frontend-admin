import * as React from 'react';

function LinkIcon({ fill = 'currentColor', ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" {...props}>
      <defs>
        <style>{`.prefix__link{fill:${fill}}`}</style>
      </defs>
      <g transform="translate(-0.009 -0.009)">
        <path
          className="prefix__link"
          d="M7.69,185.676l-2.183,2.183a2.316,2.316,0,1,1-3.276-3.275L6.6,180.217a2.315,2.315,0,0,1,3.275,0,.772.772,0,1,0,1.092-1.092,3.859,3.859,0,0,0-5.458,0l-4.367,4.367A3.86,3.86,0,1,0,6.6,188.951l2.183-2.183a.772.772,0,1,0-1.092-1.092Z"
          transform="translate(0 -172.073)"
        />
        <path
          className="prefix__link"
          d="M194.439,4.85l2.619-2.619a2.316,2.316,0,0,1,3.275,3.275l-4.8,4.8a2.315,2.315,0,0,1-3.275,0,.772.772,0,0,0-1.092,1.092,3.859,3.859,0,0,0,5.458,0l4.8-4.8a3.86,3.86,0,0,0-5.459-5.458l-2.619,2.619a.772.772,0,0,0,1.092,1.092Z"
          transform="translate(-184.548 0)"
        />
      </g>
    </svg>
  );
}

export default LinkIcon;
