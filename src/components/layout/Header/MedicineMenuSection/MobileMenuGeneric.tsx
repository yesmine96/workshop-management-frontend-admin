import { useContext, useEffect } from 'react';
import { useHistory, useLocation, matchPath } from 'react-router-dom';
import localforage from 'localforage';
import { useLogout } from 'requests/auth';
import classNames from 'utils/classNames';
import Button from 'components/Button';
import LogoutIcon from 'components/icons/LogoutIcon';
import ReturnIcon from 'components/icons/ReturnIcon';
import CancelIcon from 'components/icons/CancelIcon';

import UserContext from 'contexts/UserContext';
import MenuContext, { MenuStatesValues } from 'contexts/MenuContext';

import { decodeUri } from 'utils/url';
import PreviousMenuContext from 'contexts/PreviousMenuState';
import cardIdContext from 'contexts/CardIdContext';
import MobileMenu from '../MobileMenu';
import classes from '../Responsive.module.scss';
import classes2 from './menuSection.module.scss';

interface Props {
  open: keyof typeof MenuStatesValues;
  paramName: string;
  pathName: string;
  titleMenu?: string;
  returnSection: keyof typeof MenuStatesValues;
  data?: { id: string | number; name: string; pathname?: string[]; image?: any; MenuTrigger?: () => void }[];
}

const MobileMenuGeneric = ({ open, data, pathName, paramName, titleMenu, returnSection }: Props) => {
  const { setUser } = useContext(UserContext);
  const [logoutCall, { data: logoutData }] = useLogout();
  const { setMenuStates, MenuStates } = useContext(MenuContext);
  const history = useHistory();
  const location = useLocation();
  const uri = decodeUri(location.search);
  const { setCardId } = useContext(cardIdContext);

  const { setPreviousStates } = useContext(PreviousMenuContext);

  useEffect(() => {
    if (logoutData) {
      setUser(null);
      localforage.clear();
    }
  }, [logoutData]);
  const colorCount = { defaultColor: 'text-blue-600', selectedColor: 'text-white' };

  return (
    <MobileMenu responsiveMenuState={Boolean(MenuStates === open)}>
      <CancelIcon
        className=" absolute right-12 top-12 cursor-pointer z-50"
        height="26"
        width="20"
        fill="#111136"
        onClick={() => {
          setMenuStates(MenuStatesValues.CLOSE);
        }}
      />
      <div className="absolute top-12 translate-x-1/2 r-1/2 text-blue-600 text-xl lg:text-lg sm:text-base font-semibold">
        {' '}
        {titleMenu}{' '}
      </div>

      {MenuStates !== 'mainMenu' && (
        <ReturnIcon
          className=" absolute left-12 top-12 cursor-pointer"
          height="26"
          fill="#111136"
          width="20"
          onClick={() => setMenuStates(returnSection)}
        />
      )}

      <ul className={classNames('sm:w-9/12 xl:h-1/2 sm:h-4/6	menuList items-start', classes2.menuList)}>
        <div className=" grid flex-col  items-center flex-1 content-center z-30  gap-3">
          {data?.map(({ id, name, pathname, image: Image, MenuTrigger }) => (
            <li // eslint-disable-line
              onClick={
                MenuTrigger // eslint-disable-line
                  ? MenuTrigger
                  : () => {
                      history.push((pathname && pathname[0]) || `${pathName}?${paramName}=${id}`);
                      if (paramName === '') {
                        history.push(`${pathName}/${id}?from=home`);
                      }
                      setMenuStates(MenuStatesValues.CLOSE);
                      setPreviousStates(open);
                      setCardId('');
                    }
              }
              key={id}
              className={classNames(
                `menuItem font-medium w-168 lg:w-536 sm:w-342 m-auto relative p-3 flex items-center  justify-between cursor-pointer  hover:text-white ${
                  id === -1 ? 'hover:bg-green  text-black bg-blue-600' : ''
                } 
   
                ${
                  id !== -1 &&
                  (uri[Object.keys(uri)[0]] === id ||
                    matchPath(location.pathname, `/training/${id}`) ||
                    pathname?.some((e) => e === location.pathname))
                    ? ' text-white'
                    : ''
                }`,
                classes.menuItem,
              )}
            >
              <div className={classNames(`hoverState  absolute w-0 h-full -ml-3`, classes.hoverState)} />

              {Image && (
                <div>
                  <Image
                    className={classNames(
                      `${
                        id > 0 ? `h-8 lg:w-6 lg:h-6 sm:w-5 sm:h-5 ` : `h-8 lg:w-6 lg:h-6 sm:w-5 sm:h-5 ${classes.icon}`
                      }`,
                    )}
                    color={name === 'Liste des médicaments' ? '#F8A609' : ''}
                  />
                </div>
              )}
              <p
                className={`text-left 
                ${
                  pathname
                    ? [
                        pathname?.length > 1
                          ? 'text-4xl lg:text-2xl sm:text-sm font-medium'
                          : 'text-3xl lg:text-xl sm:text-sm font-semibold',
                      ]
                    : 'text-xl lg:text-lg sm:text-xs font-semibold'
                }
                ${!Image ? 'w-full' : 'w-11/12	sm:pl-1 xl:px-2  '}  
              }`}
              >
                {' '}
                {name}
              </p>
           
            </li>
          ))}
        </div>
      </ul>
      <Button
        onClick={() => logoutCall()}
        className={classNames(
          ' xl:w-112 sm:w-342 absolute bottom-12 mb-4  logoutButton flex  bg-blue-600 text-black hover:bg-green hover:text-white cursor-pointer z-30',
          classes.logoutButton,
        )}
      >
        <LogoutIcon className={classNames('logoutIcon h-5 sm:h-4', classes.logoutIcon)} />
        <p className="logoutText  sm:text-sm ">Déconnexion </p>
      </Button>
    </MobileMenu>
  );
};

MobileMenuGeneric.defaultProps = {
  data: [],
  titleMenu: '',
};

export default MobileMenuGeneric;
