import * as React from 'react';

function Note({ fill = 'currentColor', ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="23.259" height="30.844" viewBox="0 0 23.259 30.844" {...props}>
      <g id="Groupe_8852" data-name="Groupe 8852" transform="translate(0.25 0.25)">
        <path
          id="Tracé_408"
          data-name="Tracé 408"
          d="M84.862,2.529H81.585A1.893,1.893,0,0,0,79.8,1.264H77.562a2.516,2.516,0,0,0-4.365,0H70.954a1.893,1.893,0,0,0-1.78,1.264H65.9a1.9,1.9,0,0,0-1.9,1.9V28.448a1.9,1.9,0,0,0,1.9,1.9H84.862a1.9,1.9,0,0,0,1.9-1.9V4.425A1.9,1.9,0,0,0,84.862,2.529Zm-14.54.632a.632.632,0,0,1,.632-.632H73.6a.634.634,0,0,0,.6-.421,1.254,1.254,0,0,1,2.369,0,.632.632,0,0,0,.6.421H79.8a.632.632,0,0,1,.632.632v.632H70.322ZM85.494,28.448a.632.632,0,0,1-.632.632H65.9a.632.632,0,0,1-.632-.632V4.425a.632.632,0,0,1,.632-.632h3.161v.632a.632.632,0,0,0,.632.632H81.069a.632.632,0,0,0,.632-.632V3.793h3.161a.632.632,0,0,1,.632.632Z"
          transform="translate(-64)"
          fill={fill}
          stroke={fill}
          strokeWidth="0.5"
        />
        <line
          id="Ligne_181"
          data-name="Ligne 181"
          x2="10.164"
          transform="translate(16.462 12.702) rotate(180)"
          fill="none"
          stroke={fill}
          strokeLinecap="square"
          strokeWidth="1.5"
        />
        <line
          id="Ligne_182"
          data-name="Ligne 182"
          x2="10.164"
          transform="translate(16.459 17.137) rotate(180)"
          fill="none"
          stroke={fill}
          strokeLinecap="square"
          strokeWidth="1.5"
        />
        <line
          id="Ligne_183"
          data-name="Ligne 183"
          x2="10.164"
          transform="translate(16.459 21.573) rotate(180)"
          fill="none"
          stroke={fill}
          strokeLinecap="square"
          strokeWidth="1.5"
        />
      </g>
    </svg>
  );
}

export default Note;
