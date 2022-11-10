import * as React from 'react';

function SvgComponent({ fill = 'currentColor', ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 16.43" {...props}>
      <defs>
        <style>{`.prefix__a_volume{fill:${fill};stroke:${fill}}`}</style>
      </defs>
      <path
        className="prefix__a_volume"
        d="M3.147 4.991H.5v6.487h2.647l5 4.083s.92.845.92-.028V.809c0-.686-.81-.016-.81-.016zM13.26 5.148a.51.51 0 00-.718 0 .5.5 0 000 .714 3.3 3.3 0 01.979 2.349 3.313 3.313 0 01-.979 2.354.506.506 0 00.36.864.5.5 0 00.358-.147 4.319 4.319 0 001.276-3.07 4.305 4.305 0 00-1.276-3.064zM16.28 1.776a.517.517 0 00-.825 0 .806.806 0 000 .987 8.507 8.507 0 011.883 5.439 8.556 8.556 0 01-1.883 5.469.8.8 0 000 .987.541.541 0 00.413.2.539.539 0 00.413-.2 10.13 10.13 0 002.22-6.451 10.085 10.085 0 00-2.221-6.431z"
      />
    </svg>
  );
}

export default SvgComponent;
