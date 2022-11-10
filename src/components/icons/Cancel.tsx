function Cancel({ fill = 'currentColor', ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34 34" {...props}>
      <defs>
        <style>{`.prefix__cancel{fill:none;stroke:${fill};stroke-linecap:round;stroke-width:2.5px}`}</style>
      </defs>
      <g opacity={0.9}>
        <path className="prefix__cancel" d="M23 12L12 23M12 12l11 11" fill={fill} />
      </g>
    </svg>
  );
}

export default Cancel;
