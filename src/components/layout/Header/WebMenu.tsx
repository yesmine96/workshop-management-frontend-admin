import logoSesame from 'assets/png/logo.png';
import Search from 'components/common/Search/Search';

import cardIdContext from 'contexts/CardIdContext';
import { useContext } from 'react';
import {  useHistory } from 'react-router-dom';
import classNames from 'utils/classNames';
import Medecines from './Medecines/Medecines';
import Menu from './Menu';



const WebMenu = () => {
  const history = useHistory();
  const { setCardId } = useContext(cardIdContext);
 
  return (
    <header
      className={classNames(
        'shadow-md h-22 self-center	grid grid-flow-col items-center w-full grid-cols-469  3xl:grid 2xl:grid xl:grid lg:hidden md:hidden sm:hidden px-8 lg:px-5 lg:pr-0 2xl:grid-cols-600 lg:grid-cols-601 pr-0',
      )}
    >
      <div className="h-full grid items-center w-12/12 py-2">
        {/* eslint-disable-next-line */}
        <img
          className="cursor-pointer h-12 xl:h-10 md:h-12 sm:h-12"
          src={logoSesame}
          alt=""
          onClick={() => {
            history.push('/');
            setCardId('');
          }}
        />
      
      </div>
      <div className="flex h-full  flex-0.7 lg:flex-0.8 items-center justify-between pr-6">
        <Medecines />
        
        <Search/>
        <div className='flex gap-4'>
        <div className='text-sm rounded-5 p-4 hover:bg-white bg-white border border-blue text-blue'>Se connecter</div>
        <div className='text-sm rounded-5 p-4 bg-blue hover:bg-yellow border border-grey-100 text-grey-100'>S'inscrire</div>
        </div>
        {/* <About /> */}

        <Menu />
      </div>
    </header>
  );
};

export default WebMenu;
