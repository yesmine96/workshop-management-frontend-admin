import { useContext, useEffect, useRef } from 'react';
import localforage from 'localforage';

import UserContext from 'contexts/UserContext';
import { useLogout } from 'requests/auth';

import Row from 'components/common/DropDown/DropDownRow';
import Logout from 'components/icons/Logout';
import Note from 'components/icons/Note';
import Favorite from 'components/icons/Favorite';
import Avatar from 'components/icons/Avatar';

import DropDown from 'components/common/DropDown/DropDown';
import useMouse from 'hooks/useMouse';
import { useHistory, useLocation, matchPath } from 'react-router-dom';

const Header = () => {
  const [logoutCall, { data: logoutData }] = useLogout();
  const { user, setUser } = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();

  const divRef = useRef<HTMLButtonElement>(null);
  const [open, onMouseEnter, onMouseLeave] = useMouse();
  useEffect(() => {
    if (logoutData) {
      setUser(null);
      localforage.clear();
    }
  }, [logoutData]);

  const list = [
    {
      id: 0,
      title: 'Mes notes',
      image: Note,
      pathname: '/notes',
    },
    {
      id: 1,
      title: 'Mes favoris',
      image: Favorite,
      pathname: '/favoris',
    },
    {
      id: 2,
      title: 'Déconnexion',
      image: Logout,
      pathname: '/logout',
      click: logoutCall,
    },
  ];

  return (
    <>
      {/* <button
        onMouseEnter={() => {
          onMouseEnter();
        }}
        onMouseLeave={() => {
          onMouseLeave();
        }}
        ref={divRef}
        type="button"
        className={classNames('flex flex-row  items-center pl-1 m-auto w-40	bg-grey-600 h-full 2xl:w-32')}
      >
        <Avatar width={18} className="m-auto" />
      </button> */}

      <DropDown
        position={{ top: 112 }}
        onMouseEnter={() => {
          onMouseEnter();
        }}
        onMouseLeave={() => {
          onMouseLeave();
        }}
        className="w-52 right-0"
        open={open}
        anchorEl={divRef}
        left="auto"
      >
        {user?.role === 'admin' ? (
          <Row
            selected={!!matchPath(location.pathname, '/admin')}
            pathname="/admin"
            title="Dashboard Admin"
            Image={Avatar}
            key={3}
            onClick={() => {
              history.push('/admin');
            }}
          />
        ) : null}
        {list.map((item) => (
          <Row
            selected={!!matchPath(location.pathname, item.pathname)}
            pathname={item.pathname}
            title={item.title}
            Image={item.image}
            key={item.id}
            onClick={() => {
              if (item.pathname !== '/logout') history.push(item?.pathname);
              if (item.click) item.click();
              onMouseLeave();
            }}
          />
        ))}
      </DropDown>
    </>
  );
};

export default Header;
