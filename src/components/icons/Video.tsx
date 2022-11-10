import * as React from 'react';

function Video({ fill = 'currentColor', ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18.75 19.5" {...props}>
      <defs>
        <style>{`.prefix__b_video{fill:${fill}}`}</style>
      </defs>
      <g transform="translate(-1405.294 -2487.75)">
        <rect
          width={15.248}
          height={18}
          rx={2}
          transform="translate(1408.046 2488.5)"
          fill="none"
          stroke={fill}
          strokeWidth={1.5}
        />
        <path
          className="prefix__b_video"
          d="M1415.518 2497.828l-9.3 5.485c-.371.219-.919.023-.919-.327v-10.971c0-.351.548-.546.919-.327l9.3 5.485a.358.358 0 010 .655z"
        />
        <path
          className="prefix__b_video"
          d="M1406.091 2503.719a.855.855 0 01-.512-.166.706.706 0 01-.285-.57v-10.964a.706.706 0 01.285-.569.873.873 0 01.965-.04l8.842 5.482a.711.711 0 010 1.219l-8.842 5.482a.86.86 0 01-.453.126zm-.279-.744a.415.415 0 00.5.053l8.84-5.478.117.282-.117-.282a.046.046 0 100-.09l-8.842-5.482a.415.415 0 00-.5.053z"
        />
      </g>
    </svg>
  );
}

export default Video;
