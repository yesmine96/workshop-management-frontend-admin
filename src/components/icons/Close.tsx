function Close({ fill = 'black', ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29.657 29.657" {...props}>
      <defs>
        <style>{`.prefix__a_close{fill:none;stroke:${fill};stroke-linecap:round;stroke-width:4px}`}</style>
      </defs>
      <path className="prefix__a_close" d="M26.829 2.828l-24 24M2.829 2.828l24 24" />
    </svg>
  );
}

export default Close;
