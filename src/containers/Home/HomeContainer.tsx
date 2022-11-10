import Up from 'assets/svg/goUp.svg';
import Card from 'components/common/Card/Card';
import Breadcrumbs from 'components/ux/Breadcrumb';

import cardIdContext from 'contexts/CardIdContext';
import MenuContext, { MenuStatesValues } from 'contexts/MenuContext';
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import {  useLocation } from 'react-router-dom';
import { useLazyMedicines } from 'requests/trainings';
import classNames from 'utils/classNames';
import { Spinner } from 'utils/loading';
import { decodeUri } from 'utils/url';
import classes from './HomeContainer.module.scss';
import classes2 from './HomeContainer2.module.scss';

export const PER_PAGE = 100;

const MEDICAMENT_MODIFIERS = ['page', 'order', 'deviceType', 'dci', 'device', 'classe', 'indication', 'start'];

interface Props {
  title?: React.ReactNode;
  filterComponent: React.ReactNode;
  typeFilter?: string;
}

const HomeContainer: React.FC<Props> = () => {
  const location = useLocation();

  const uri = decodeUri(location.search);
  const [responsive, setresponsive] = useState(window.innerWidth < 1000);
  const { setMenuStates } = useContext(MenuContext);
  const [readSectionActive, setreadSectionActive] = useState(false);
  const { cardId, setCardId } = useContext(cardIdContext);
  const [, setvideoModal] = useState(false);
  console.log(uri,'et')
  const [dataCall, { data, loading: MedicineLoading }] = useLazyMedicines({
    fetchPolicy: 'no-cache',
    variables: {
   
      idCategory: uri.idCat,
      idSubCategories: uri.idSubCat

    },

  });
  useEffect(() => {
    dataCall({
      variables: {
      idCategory: uri.idCat,
       idSubCategories: uri.idSubCat,
        name:uri.name

      },
    });
    
  }, [location, uri.idCat,uri.idSubCat]);
  useEffect(
    () => {
      dataCall({
        variables: {
          ...uri,
          sort: 'name',
          order: uri?.order === '-1' ? -1 : 1,
          idCategory: uri.idCat
        },
      });
    },
    MEDICAMENT_MODIFIERS.map((modifier) => uri[modifier]),
  );

  useEffect(() => {
    const el = document.getElementById(cardId || '');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    
  }, [location, uri]);

  const updatePage = (e: any): void => {
    if (e.target.scrollingElement.scrollTop > 1040) {
      setreadSectionActive(true);
    } else {
      setreadSectionActive(false);
    }
  };
  useEffect(() => {
    window.scrollTo({ top: 0 });
    window.addEventListener('scroll', updatePage);
    return () => {
      window.removeEventListener('scroll', updatePage);
    };
  }, []);
  const checkResponsive = () => {
    if (window.innerWidth < 1000) {
      setresponsive(true);
    } else {
      setMenuStates(MenuStatesValues.CLOSE);
      setresponsive(false);
    }
  };
  useEffect(() => {
    window.addEventListener('resize', checkResponsive);
    return () => {
      window.removeEventListener('resize', checkResponsive);
    };
  }, []);
  const scrollToTop = () => {
    setCardId('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
 
const nameCat=  data?.trainings.data.find((o: any) => o.idCategory.id === uri.idCat)
const nameSubCat= data?.trainings.data.find((o: any) => o.idSubCategories.id === uri.idSubCat)

  return (
    <>

<Breadcrumbs  previousPage={[{title:nameCat?.idCategory?.name,link:`/?idCat=${nameCat?.idCategory.id}/'`} ]} currentPage={nameSubCat?.idSubCategories.name}/>
      <div
        className={classNames(
          'bg-grey-200 px-8  lg:px-8  sm:px-5 sm:py-1 ',
          !responsive ? classes2.container : classes.container2,
        )}
      >
        {/* <div className={classNames('text-grey-400 text-2xl font-bold mb-1', classes.title)}>{title}</div> */}

        <div className={classNames(classes.result)}>
       
         
          <div className="grid grid-cols-4 2xl:grid-cols-4 lg:grid-cols-2 sm:grid-cols-1 gap-4 justify-between gap-y-5 pt-2.5 pb-10 relative min-h-30">
            {MedicineLoading ? (
              <div className="absolute top-1/3 right-1/2">
                <Spinner name="line-scale-pulse-out-rapid" color="#00a1a2" />
              </div>
            ) : (
              <>
                {data?.trainings.data
                  // .sort((a, b) => a?.dci?.name.localeCompare(b?.dci?.name, 'en', { sensitivity: 'base' }))
                  .map((e:any) => {
                    return (
                      <>
                        <Card
                          className="h-full"
                          from="home"
                          key={e.id}
                          deviceType={e.name}
                          title={e.name}
                          price ={`${e.price} dt`}
                          trainingPhoto={e.image[0]}
                          trainingId={e.id}
                          typeVideoOpen={setvideoModal}
                          trainer={e.idTrainer?.fullName}
                          date={`De ${moment(e.dateStart, 'x').format('DD/MM/YYYY ')}  jusqu'à ${moment(e.dateEnd, 'x').format('DD/MM/YYYY ')} `}
                          heure={`${moment(e.dateStart, 'x').format('HH:mm')}  - ${moment(e.dateEnd, 'x').format('HH:mm')} `}
                         

                        />
                      </>
                    );
                  })}
              </>
            )}
          </div>
        </div>
        <button
          className={`fixed bottom-5 ${readSectionActive ? 'right-1' : '-right-24'}`}
          onClick={() => scrollToTop()}
        >
          <img alt="up" src={Up} height={30} />
        </button>
      </div>
    </>
  );
};

export default HomeContainer;
