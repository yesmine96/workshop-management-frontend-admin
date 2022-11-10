function AboutIcon({ fill = 'currentColor', ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" {...props}>
      <g id="Groupe_8842" data-name="Groupe 8842" transform="translate(0.34 0.3)">
        <g
          id="Rectangle_156"
          data-name="Rectangle 156"
          transform="translate(-0.34 -0.3)"
          fill="none"
          stroke={fill}
          strokeWidth="1.5"
        >
          <rect width="25" height="25" rx="3" stroke="none" />
          <rect x="0.75" y="0.75" width="23.5" height="23.5" rx="2.25" fill="none" />
        </g>
        <line
          id="Ligne_82"
          data-name="Ligne 82"
          x2="15.172"
          transform="translate(4.414 10.582)"
          fill="none"
          stroke={fill}
          strokeWidth="1.5"
        />
        <line
          id="Ligne_83"
          data-name="Ligne 83"
          x2="15.172"
          transform="translate(4.414 15.768)"
          fill="none"
          stroke={fill}
          strokeWidth="1.5"
        />
      </g>
    </svg>
  );
}

export default AboutIcon;
