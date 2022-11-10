import * as React from 'react';

function More({ fill = 'currentColor', ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20.5 20.5" {...props}>
      <defs>
        <style>{`.prefix__a_more{fill:none;stroke:${fill};stroke-linecap:round;stroke-width:2.5px}`}</style>
      </defs>
      <path className="prefix__a_more" d="M10.25 1.25v18M19.25 10.22h-18" />
    </svg>
  );
}

export default More;
