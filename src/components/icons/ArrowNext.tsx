import * as React from 'react';

function ArrowNext({ fill = 'currentColor', ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 12" {...props}>
      <path
        d="M17.349 4.678L10.738.207a1.129 1.129 0 00-1.3 0 1.574 1.574 0 00-.651 1.322v3.333a1.364 1.364 0 00-.218-.184L1.955.207a1.129 1.129 0 00-1.3 0A1.574 1.574 0 000 1.529v8.942a1.574 1.574 0 00.651 1.322A1.158 1.158 0 001.3 12a1.158 1.158 0 00.651-.207l6.614-4.471a1.354 1.354 0 00.218-.184v3.333a1.574 1.574 0 00.651 1.322 1.129 1.129 0 001.3 0l6.611-4.471A1.574 1.574 0 0018 6a1.574 1.574 0 00-.651-1.322z"
        fill={fill}
      />
    </svg>
  );
}

export default ArrowNext;
