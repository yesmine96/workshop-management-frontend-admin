import * as React from 'react';

function Linkedin({ fill = 'currentColor', ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.589 14.896" {...props}>
      <path
        d="M15.589 9.133v5.763h-3.341V9.519c0-1.351-.483-2.273-1.693-2.273a1.828 1.828 0 00-1.714 1.222 2.286 2.286 0 00-.111.815v5.613H5.388s.045-9.107 0-10.051H8.73V6.27l-.022.032h.022V6.27a3.318 3.318 0 013.012-1.661c2.198 0 3.847 1.433 3.847 4.524zM1.891 0a1.742 1.742 0 10-.044 3.474h.022A1.742 1.742 0 101.891 0zM.2 14.896h3.34V4.842H.2z"
        fill={fill}
      />
    </svg>
  );
}

export default Linkedin;
