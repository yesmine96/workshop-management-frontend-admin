
import DropDown from 'components/common/DropDown/DropDown';
import Medicines from 'components/common/Generic/Generic';
import ArrowDown from 'components/icons/ArrowDown';

import cardIdContext from 'contexts/CardIdContext';
import useMouse from 'hooks/useMouse';
import { useContext, useEffect, useRef, useState } from 'react';
import {  useHistory, useLocation } from 'react-router-dom';
import { useCategory } from 'requests/Category/category.service';
import classNames from 'utils/classNames';
import { decodeUri } from 'utils/url';
import HeaderLink from '../HeaderLink';
import classes from './medecines.module.scss';


const Medecines = () => {
  const [open, onMouseEnter, onMouseLeave] = useMouse();
  const divRef = useRef<HTMLButtonElement>(null);
  const [selectItem, setSelectItem] = useState("");
  const history = useHistory();
  const location = useLocation();
  const { setCardId } = useContext(cardIdContext);
  const { data: dataCategoty } = useCategory({ fetchPolicy: 'no-cache' });



  useEffect(() => {
    const unsubscribe = history.listen(onMouseLeave);
    return unsubscribe;
  }, []);

  const uri = decodeUri(location.search);


  return (
    <>
      <HeaderLink
        open={open}
        selected={open || uri.section === 'trainings'}
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
          <p className='text-sm'> Categories</p>
        </div>
      </HeaderLink>

      <DropDown
        position={{ left: -210, top: 112 }}
        onMouseEnter={() => {
          onMouseEnter();
        }}
        onMouseLeave={() => {
          onMouseLeave();
        }}
        className={classNames(`w-5/12`, classes.menu)}
        open={open}
        anchorEl={divRef}
      >
        <div
          onClick={(e) => {
            e.preventDefault();
          }}
          className={classNames('w-full flex ', classes.dropDow)}
        >
          <div className={classNames('flex flex-col  items-center shadow-2 w-1/2', classes.list)}>
          
            <div className="w-full  flex-col flex text-black pb-10 text-base pt-6">
              {dataCategoty?.categorys.data.map((e) => {
                return (
                  <div
                    key={e.id}
                    onMouseEnter={() => setSelectItem(e.id)}

                    onClick={() => {
                      setSelectItem(e.id);
                    history.push(`/?idCat=${e.id}`);
                    

                      setCardId('');
                    }}
                    className={classNames(
                      'w-full items-center flex h-10 font-normal cursor-pointer',
                      'hover:bg-white hover:text-blue-600 text-black hover:font-semibold',
                     ` ${location.search?.includes(`idCat=${e.id}`) && 'text-green'}`,
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
        {selectItem!==""  && <div className='shadow-2 w-1/2' ><Medicines id={selectItem}/> </div>}
        </div>
      </DropDown>
    </>
  );
};

export default Medecines;
