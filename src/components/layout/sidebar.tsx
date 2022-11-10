import Colis from 'components/icons/Manifest';
import Custumer from 'components/icons/Custumer';
import Dashboard from 'components/icons/Dashbord';
import Logout from 'components/icons/Logout';
import Manifest from 'components/icons/Manifest';
import Profil from 'components/icons/Profil';
import IconContainer from 'components/ui/Route/IconContainer';
import UserContext from 'contexts/UserContext';
import localforage from 'localforage';
import { useContext, useEffect, useMemo, useState } from 'react';
import { matchPath, useHistory, useLocation } from 'react-router-dom';
import { useLogout } from 'requests/Auth/auth';
import sdcLogo from 'assets/png/logo.png';

const SideBar = () => {
  const location = useLocation();
  const history = useHistory();
  const [logoutCall, { data: logoutData }] = useLogout();
  const [selected, setSelected] = useState(-1);
  const { setUser } = useContext(UserContext);
  useEffect(() => {
    if (logoutData) {
      setUser(null);
      localforage.clear();
    }
  }, [logoutData]); // eslint-disable-line
  const Items = useMemo(
    () => [
      {
        title: 'Dashboard',
        link: '/',
        icon: Dashboard,
        activeLink: ['/'],
        id: 0,
      },
      {
        title: 'Gestion des formations',
        link: '/training',
        icon: Colis,
        activeLink: ['/training', '/addTrainig'],
        id: 1,
      },
      {
        title: 'Gestion des formateurs',
        link: '/Trainer',
        icon: Custumer,
        activeLink: ['/Trainer'],
        id: 2,
      },

      // {
      //   title: 'Gestion des  clients',
      //   link: '/clients',
      //   icon: Custumer,
      //   activeLink: ['/clients'],
      //   id: 6,
      // },
    ],
    [],
  );
  const selectedItemId = Items.find((e) => matchPath(location.pathname, e.activeLink));

  useEffect(() => {
    if (selectedItemId) setSelected(selectedItemId.id);
  }, [selectedItemId]);
  return (
    <div>
      <div className="relative flex flex-col h-screen justify-between  ">
        <div className="ml-8 pt-10 lg:hidden flex flex-col h-full pb-10 justify-between items-center align-center">
          <div className="flex py-4 flex-col rounded-[12px] relative w-[max-content] !bg-white shadow-dropdown mt-[124px]">
            {Items.map(({ icon: Image, ...e }, key) => {
              return (
                <div
                  onClick={() => history.push(e.link)}
                  key={e?.id}
                  className={`${
                    location.pathname === e.link ? 'text-orange' : 'text-gray'
                  } font-Calibre flex  px-8  py-3 max-w-[364px] hover:text-black duration-200 `}
                >
                  {' '}
                  <div className="mr-4 cursor-pointer self-center pb-2">
                    <Image width="20px" />{' '}
                  </div>
                  <div className={`cursor-pointer text-xl`}>{e.title}</div>{' '}
                </div>
              );
            })}
            <img alt="sidebar_mig" src={sdcLogo} className="w-[150px] py-[20px] mt-[100px] pb-[20px] mx-auto" />
          </div>
        </div>
        {false && (
          <div className="ml-16 w-[max-content] text-center pb-16">
            <div>
              <IconContainer Icon={Manifest} className="m-auto" />
              <div className="font-Calibre text-2xl">Yesmine Ghorbel</div>
            </div>

            <div className="flex justify-center items-center text-center gap-x-2 pt-4">
              <IconContainer Icon={Profil} className="shadow-sm cursor-pointer text-center" />
              <IconContainer
                Icon={Logout}
                className="shadow-sm cursor-pointer text-center"
                onClick={() => logoutCall()}
              />
            </div>
          </div>
        )}
      </div>

      <div className=" z-40  items-center hidden lg:flex w-full justify-evenly h-[68px] bg-white shadow-dropdown m-0 p-0 fixed bottom-0">
        {Items.map(({ icon: Image, ...e }, key) => {
          return (
            <div
              onClick={() => history.push(e.link)}
              key={e?.id}
              className={`${
                selected === key ? 'text-orange' : 'text-gray'
              } font-Calibre flex flex-col gap-2 justify-center items-center   hover:text-black duration-200 `}
            >
              <div className=" cursor-pointer">
                <Image width="20px" />{' '}
              </div>
              <div className={`cursor-pointer text-sm md:text-[12px]`}>{e.title}</div>{' '}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SideBar;
