function FilterIcon({ fill = 'currentColor', ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17.418 17.418" {...props}>
      <defs>
        <style>{`.a_filter{fill:${fill};stroke:${fill};}`}</style>
      </defs>
      <g transform="translate(0.5 0.499)">
        <g transform="translate(0 0.001)">
          <path
            className="a_filter"
            d="M8.809,14.861H.5a.5.5,0,0,1,0-1H8.808a2.061,2.061,0,1,1,0,1Zm5.02,0a3.1,3.1,0,0,0,0-1h2.087a.5.5,0,0,1,0,1ZM3.616,8.711H.5a.5.5,0,0,1,0-1H3.616a2.059,2.059,0,1,1,0,1Zm5.02,0a3.058,3.058,0,0,0,0-1h7.28a.5.5,0,0,1,0,1Zm.174-6.15H.5a.5.5,0,0,1,0-1H8.808a2.061,2.061,0,1,1,0,1Zm5.02,0a3.1,3.1,0,0,0,0-1h2.087a.5.5,0,0,1,0,1Z"
          />
        </g>
      </g>
    </svg>
  );
}

export default FilterIcon;
