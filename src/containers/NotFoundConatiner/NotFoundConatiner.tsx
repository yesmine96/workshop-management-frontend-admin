import Search from 'components/common/Search/Search';
import img from 'assets/svg/404.svg';

const NotFoundContainer = () => {
  return (
    <div className="bg-grey-200 w-full h-full  relative ">
      <div className="pt-134 pb-257  2xl:pb-126 2xl:pt-59 flex flex-col 	items-center ">
        {' '}
        <div className="font-bold  text-178 text-green 2xl:text-98">404</div>
        <div className="font-bold text-60 text-green 2xl:text-42 lg:text-center">Page non disponible</div>
        <div className="w-9/12	lg:w-full">
          {' '}
          <Search className="	bg-grey-200" />
        </div>
      </div>

      <div className="absolute bottom-0">
        {' '}
        <img src={img} alt="" />
      </div>
    </div>
  );
};

export default NotFoundContainer;
