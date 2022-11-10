
const Footer = () => {
  return (
    <>

      <div className="text-blue-600 text-xs flex justify-center items-center  bg-grey-800 lg:bg-green lg:text-white">
        Copyright {new Date().getFullYear()} Sesame.
        <span className="underline pl-1"> Mentions légales</span>
      </div>
    </>
  );
};
export default Footer;
