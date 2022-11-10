function MenuIcon({ fill = 'currentColor', ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29 21" {...props}>
      <defs>
        {/* eslint-disable-next-line */}
        <style>{`.menu_a{fill:none;stroke:${fill + ' !important'};stroke-linecap:round;stroke-width:3px;}`}</style>
      </defs>
      <g transform="translate(-340.6 -37.5)">
        <line className="menu_a" x1="26" transform="translate(342.1 57)" />
        <line className="menu_a" x1="26" transform="translate(342.1 48.529)" />
        <line className="menu_a" x1="26" transform="translate(342.1 39)" />
      </g>
    </svg>
  );
}

export default MenuIcon;
