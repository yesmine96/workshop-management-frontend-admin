import * as React from 'react';

function Pause({ fill = 'currentColor', ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.75 18" {...props}>
      <defs>
        <style>{`.prefix__a_pause{fill:${fill}}`}</style>
      </defs>
      <path
        className="prefix__a_pause"
        d="M4.669 0H2.081A2.022 2.022 0 000 1.952v14.1A2.022 2.022 0 002.081 18h2.588a2.022 2.022 0 002.081-1.952V1.952A2.022 2.022 0 004.669 0zM13.668 0H11.08a2.022 2.022 0 00-2.081 1.952v14.1A2.022 2.022 0 0011.08 18h2.588a2.022 2.022 0 002.081-1.952V1.952A2.022 2.022 0 0013.668 0z"
      />
    </svg>
  );
}

export default Pause;
