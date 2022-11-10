import * as React from 'react';

function Remove({ fill = 'currentColor', ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13.765 18" {...props}>
      <defs>
        <clipPath id="prefix__a">
          <path className="prefix__a" d="M0 0h13.765v18H0z" />
        </clipPath>
        <style>{`.prefix__a{fill:${fill}}`}</style>
      </defs>
      <path
        className="prefix__a"
        d="M9.609 6.687a.388.388 0 00-.388.388v7.342a.389.389 0 00.777 0V7.075a.388.388 0 00-.388-.388zm0 0"
      />
      <g clipPath="url(#prefix__a)">
        <path
          className="prefix__a"
          d="M4.746 6.363a.411.411 0 00-.411.411v7.774a.411.411 0 00.823 0V6.774a.411.411 0 00-.411-.411zm0 0"
        />
        <path
          className="prefix__a"
          d="M1.209 5.231v10.134a2.269 2.269 0 00.6 1.565 2.025 2.025 0 001.47.635h7.782a2.025 2.025 0 001.47-.635 2.27 2.27 0 00.6-1.565V5.231a1.571 1.571 0 00-.4-3.09h-2.106v-.514A1.616 1.616 0 008.999.004H5.344a1.616 1.616 0 00-1.629 1.625v.514H1.609a1.571 1.571 0 00-.4 3.09zm9.855 11.512H3.282a1.3 1.3 0 01-1.25-1.378v-10.1h10.282v10.1a1.3 1.3 0 01-1.25 1.378zM4.544 1.627a.792.792 0 01.806-.8h3.652a.792.792 0 01.806.8v.514H4.544zM1.616 2.964h11.118a.74.74 0 110 1.481H1.612a.74.74 0 110-1.481zm0 0"
        />
      </g>
      <path
        className="prefix__a"
        d="M7.174 6.687a.388.388 0 00-.388.388v7.342a.389.389 0 00.777 0V7.075a.388.388 0 00-.388-.388zm0 0"
      />
    </svg>
  );
}

export default Remove;
