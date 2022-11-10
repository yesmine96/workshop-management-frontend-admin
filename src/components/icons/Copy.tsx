import * as React from 'react';

function Copy({ fill = 'currentColor', ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" {...props}>
      <defs>
        <style>{`.prefix__a_copy{fill:${fill}}`}</style>
      </defs>
      <path
        className="prefix__a_copy"
        d="M7.681 13.594l-2.183 2.183a2.316 2.316 0 11-3.276-3.275l4.369-4.367a2.315 2.315 0 013.275 0 .772.772 0 101.092-1.092 3.859 3.859 0 00-5.458 0L1.133 11.41a3.86 3.86 0 105.458 5.459l2.183-2.183a.772.772 0 10-1.092-1.092z"
      />
      <path
        className="prefix__a_copy"
        d="M9.882 4.841l2.619-2.619a2.316 2.316 0 013.275 3.275l-4.8 4.8a2.315 2.315 0 01-3.275 0 .772.772 0 00-1.092 1.092 3.859 3.859 0 005.458 0l4.8-4.8a3.86 3.86 0 00-5.459-5.458L8.789 3.75a.772.772 0 001.092 1.092z"
      />
    </svg>
  );
}

export default Copy;
