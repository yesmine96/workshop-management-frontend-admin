import * as React from 'react';

function Instagram({ fill = '#111136', ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17.5 17.5" {...props}>
      <defs>
        <style>{`.prefix__a{fill:${fill}}`}</style>
      </defs>
      <path
        className="prefix__a"
        d="M12.287 0H5.213A5.219 5.219 0 000 5.213v7.073A5.219 5.219 0 005.213 17.5h7.073a5.219 5.219 0 005.214-5.213V5.213A5.219 5.219 0 0012.287 0zm3.453 12.287a3.453 3.453 0 01-3.453 3.453H5.213a3.453 3.453 0 01-3.453-3.453V5.213A3.453 3.453 0 015.213 1.76h7.073a3.453 3.453 0 013.454 3.453v7.073z"
      />
      <path
        className="prefix__a"
        d="M8.75 4.224a4.526 4.526 0 104.526 4.526A4.531 4.531 0 008.75 4.224zm0 7.292a2.766 2.766 0 112.766-2.766 2.766 2.766 0 01-2.766 2.766z"
      />
      <circle className="prefix__a" cx={1.085} cy={1.085} transform="translate(12.2 3.173)" r={1.085} />
    </svg>
  );
}

export default Instagram;
