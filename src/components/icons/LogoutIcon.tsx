import * as React from 'react';

function Logout({ fill = 'currentColor', ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" {...props}>
      <defs>
        {/* eslint-disable-next-line */}
        <style>{`.prefix__logout{fill:${fill}}`}</style>
      </defs>
      <path
        className="prefix__logout"
        // eslint-disable-next-line
        d="M5.025 6.187a.92.92 0 00-1.3-1.3L.266 8.346a.917.917 0 000 1.3l3.459 3.459a.92.92 0 001.3-1.3L3.132 9.912h10.016a.917.917 0 100-1.835H3.132zm0 0"
      />
      <path
        className="prefix__logout"
        // eslint-disable-next-line
        d="M16.471 0H7.91a1.54 1.54 0 00-1.529 1.552v1.241a.917.917 0 101.835 0v-.931h7.95v14.276h-7.95v-.931a.917.917 0 10-1.835 0v1.241A1.54 1.54 0 007.91 18h8.561A1.54 1.54 0 0018 16.448v-14.9A1.54 1.54 0 0016.471 0zm0 0"
      />
    </svg>
  );
}

export default Logout;
