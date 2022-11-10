// import ClassesTherp from 'components/common/Classes/Classes';
// import Dci from 'components/common/Dci/Dci';
import DropDown from 'components/common/DropDown/DropDown';
import Medicines from 'components/common/Generic/Generic';
import ArrowDown from 'components/icons/ArrowDown';
// import ArrowRight from 'components/icons/ArrowRight';
// import HomeIcon from 'components/icons/HomeIcon';
import cardIdContext from 'contexts/CardIdContext';
import useMouse from 'hooks/useMouse';
import { useContext, useEffect, useRef, useState } from 'react';
import { matchPath, useHistory, useLocation } from 'react-router-dom';
import { useCategory } from 'requests/Category/category.service';
import classNames from 'utils/classNames';
import { decodeUri } from 'utils/url';
import HeaderLink from '../HeaderLink';
import classes from './medecines.module.scss';

const validPaths = [
  { path: '/', exact: true, id: -1 },
  { path: '/training', exact: true, id: 1 },
  { path: '/classe', exact: true, id: 2 },
  { path: '/dci', exact: true, id: 3 },
  { path: '/videos', exact: true, id: 4 },
];

const Medecines = () => {
  const [open, onMouseEnter, onMouseLeave] = useMouse();
  const divRef = useRef<HTMLButtonElement>(null);
  const [selectItem, setSelectItem] = useState("");
  const history = useHistory();
  const location = useLocation();
  const { setCardId } = useContext(cardIdContext);
  const { data: dataCategoty } = useCategory({ fetchPolicy: 'no-cache' });

  // const list = [
  //   {
  //     id: 1,
  //     title: 'Médicaments',
  //   },
  //   {
  //     id: 2,
  //     title: 'Classes thérapeutiques',
  //   },
  //   {
  //     id: 3,
  //     title: 'DCI',
  //   },
  //   {
  //     id: 4,
  //     title: 'Vidéos éducatives',
  //     pathName: '/videos',
  //   },
  // ];

  useEffect(() => {
    const unsubscribe = history.listen(onMouseLeave);
    return unsubscribe;
  }, []);

  // function renderData() {
  //   switch (selectItem) {
  //     case -1:
  //       return (
  //         <div className="text-center h-full w-full items-center flex">
  //           {false && <HomeIcon className="w-64 2xl:w-60	 m-auto" />}
  //         </div>
  //       );
  //     case 1:
  //       return <Medicines />;
  //     case 2:
  //       return <ClassesTherp />;
  //     case 3:
  //       return <Dci />;
  //     default:
  //       return null;
  //   }
  // }

  const uri = decodeUri(location.search);
  const selected = validPaths.some(
    (path) =>
      matchPath(`/${Object.keys(uri)[0]}`, path) ||
      matchPath(`/${uri?.from}`, path) ||
      (path.path === '/training' && location.pathname.includes(path.path)),
  );
  // const selectedMenu = validPaths.filter(
  //   (path) =>
  //     matchPath(`${path.path}`, [`/${Object.keys(uri)[0]}`, `/${uri?.from}`, location?.pathname]) ||
  //     (path.path === '/training' && uri?.from === 'home' && location.pathname.includes(path.path)),
  // );

  // useEffect(() => {
  //   if (selectedMenu.length > 0) setSelectItem(selectedMenu[0]?.id);
  // }, [open]);
  useEffect(() => {
    // if (!selected || location?.pathname === '/') {
    //   setSelectItem(-1);
    // }
  }, [selected, location]);

  return (
    <>
      <HeaderLink
        open={open}
        selected={selected || open || uri.section === 'trainings'}
        onMouseEnter={() => {
          onMouseEnter();
        }}
        onMouseLeave={() => {
          onMouseLeave();
        }}
        ref={divRef}
        type="button"
        className={(classNames('flex flex-1 flex-row h-full w-full justify-center items-center px-3'), classes.svg)}
      >
        <div className="flex items-baseline px-2 ">
          <ArrowDown className="mr-3" width="11px" />
          <p> Categories</p>
        </div>
      </HeaderLink>

      <DropDown
        position={{ left: 0, top: 112 }}
        onMouseEnter={() => {
          onMouseEnter();
        }}
        onMouseLeave={() => {
          onMouseLeave();
        }}
        className={classNames(`w-300 2xl:w-full`, classes.menu)}
        open={open}
        anchorEl={divRef}
      >
        <div
          onClick={(e) => {
            e.preventDefault();
          }}
          className={classNames('w-full flex grid', classes.dropDow)}
        >
          <div className={classNames('flex flex-col  items-center ', classes.list)}>
            <div
              className={classNames(
                `cursor-pointer hover:bg-grey hover:text-black `,
                `flex p-3 mt-3 items-center text-blue-600 w-full `,
                // ` justify-center ${selectItem === -1 && selected ? 'text-blue' : 'text-blue'}`,
                classes.medecineRoot,
              )}
              onClick={() => {
                history.push('/?section=trainings');
                setCardId('');
              }}
            >
              <div className="  text-current font-semibold text-lg">Liste des médicaments</div>
            </div>
            <div className="w-full  flex-col flex text-black pb-10 text-base">
              {dataCategoty?.categorys.data.map((e) => {
                return (
                  <div
                    key={e.id}
                    onClick={() => {
                      setSelectItem(e.id);
                    history.push(e.name);

                      setCardId('');
                    }}
                    className={classNames(
                      'w-full justify-end pr-12 items-center flex h-10 font-normal cursor-pointer',
                      'hover:bg-white hover:text-blue-600 text-black hover:font-semibold',
                      e.id === selectItem && 'bg-white text-blue-600 font-semibold',
                      classes.titlesMenu,
                    )}
                  >
                    <div className={`${e.name ? 'w-80 pl-6' : 'w-72'} flex `}> {e.name}</div>

                    {/* {!e.pathName && <ArrowRight fill="rgba(17, 17, 54)" height={14} />} */}
                  </div>
                );
              })}
            </div>
          </div>
          <div>
          
          </div>
        </div>
      </DropDown>
    </>
  );
};

export default Medecines;
