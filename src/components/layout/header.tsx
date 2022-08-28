import NotificationDropDown from 'components/ux/NotificationDropDown';
import ProfileDropDown from 'components/ux/ProfileDropDown';

const Header = () => {
  return (
    <div className="flex flex-col gap-20 items-center justify-center  pb-[3.5rem] realtive">
      <div>
        <div className="flex items-center justify-end gap-6 pt-0 pb-4 absolute right-4 top-10 px-3  ">
          <div className="lg:hidden">{/* <Search inputClasses=" pr-[6px] pl-[56px]" onSearch={} /> */}</div>
          <div className="hover:shadow-dropdown cursor-pointer rounded-full p-2">
            <NotificationDropDown />
          </div>
          <ProfileDropDown />
        </div>
      </div>
      {/* <div className="hidden lg:block w-full">
        <Search inputClasses="!min-w-[100%] pl-[50px]" onSearch={} />
      </div> */}
    </div>
  );
};

export default Header;
