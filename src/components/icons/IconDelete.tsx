function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21.128 29.142" {...props}>
      <defs>
        <style>{'.prefix__a_delete_icon{fill:#111136}'}</style>
      </defs>
      <path
        className="prefix__a_delete_icon"
        d="M11.821 0c.959 0 1.287.777 1.287 1.736h7.722v3.473H0V1.736h7.9C7.899.777 8.087 0 9.05 0zM17.62 29.142H3.589a3.385 3.385 0 01-3.508-3.239V6.476h21.047v19.427a3.385 3.385 0 01-3.508 3.239zM14.989 9.714a.846.846 0 00-.876.81v14.57a.88.88 0 001.754 0v-14.57a.847.847 0 00-.878-.81zm-8.769 0a.847.847 0 00-.878.81v14.57a.846.846 0 00.878.809.845.845 0 00.876-.809v-14.57a.846.846 0 00-.876-.81z"
      />
    </svg>
  );
}

export default SvgComponent;
