import Up from 'assets/svg/goUp.svg';
import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
import {  useLocation, useParams } from 'react-router-dom';
import { useTrainingById } from 'requests/trainings';
import { Spinner } from 'utils/loading';
import { useGetSearch } from 'requests/review';
import Carousel from 'components/ux/Carousel';
import ScrollLeftArrow from 'components/icons/ScrollLeftArrow';
import ScrollRightArrow from 'components/icons/ScrollRightArrow';
import StaisticsContainer from 'components/ux/StatisticsContainer';
import TrainingHeader from './Components/TrainingHeader';
import TrainingTable from './Components/TrainingTable';

const DetailsContainer = () => {
  const params = useParams<{ id: string }>();
  const location = useLocation();

  const [readSectionActive, setreadSectionActive] = useState(false);
  const ref = useRef<any>(null);
 
  const { data: dataReviews } = useGetSearch({
    variables: { idTraining:params.id },
    fetchPolicy: 'no-cache',
  });
  const updatePage = (e: any): void => {
    if (e.target.scrollingElement.scrollTop > 700) {
      setreadSectionActive(true);
    } else {
      setreadSectionActive(false);
    }
  };
console.log(dataReviews,'data!!!')
  useEffect(() => {
    window.addEventListener('scroll', updatePage);
    return () => {
      window.removeEventListener('scroll', updatePage);
    };
  }, []);





  useEffect(() => {
    window.scroll({ top: 0 });
  }, [location]);

  const { data, called, loading } = useTrainingById({
    variables: { id: params?.id },
    fetchPolicy: 'no-cache',
  });



  if (loading)
    return (
      <div className="flex flex-1 items-center justify-center">
        <Spinner name="line-scale-pulse-out-rapid" color="#00a1a2" />
      </div>
    );



  return (
    <>
      {!data && called ? (
        <div className="flex flex-1 items-center justify-center">
          <Spinner name="line-scale-pulse-out-rapid" color="#00a1a2" />
        </div>
      ) : (
        <div className=" w-full h-full flex-1">
          <>
            <div className="bg-grey-200 flex flex-row w-full px-20 py-12 lg:py-0 lg:px-5 sm:px-5  sm:py-0 lg:flex-col  gap-20 2xl:gap-4 lg:m-auto ">
           
              <div className="flex flex-1 justify-between">
              <div className="w-96 lg:w-full  flex-0 justify-center items-center mr-2  ">

              <Carousel images={data?.training.image || []} />
              </div>
              <div className='w-1/2'>
                  <TrainingHeader  
                    training={data.training}
                  />
                
              
                <div className="flex-col flex">
              
                  <TrainingTable
                    name={data.training.name}
                    date={`De ${moment(data.training.dateStart, 'x').format('DD/MM/YYYY ')}  jusqu'à ${moment(data.training.dateEnd, 'x').format('DD/MM/YYYY ')} `}
                    heure={`${moment(data.training.dateStart, 'x').format('HH:mm')}  - ${moment(data.training.dateEnd, 'x').format('HH:mm')} `}
                    trainer={data?.training?.idTrainer?.fullName}
                    cat={data?.training?.idCategory?.name}
                    image= {data?.training?.image[0]}
                    subCat={data?.training?.idSubCategories?.name}
                    description={data?.training?.description}

                  />
                </div>
                </div>
              </div>
            </div>

          </>
          <div className="relative w-9/12 m-auto">
        <div
          ref={ref}
          className="flex gap-x-4   py-2 pb-5 overflow-visible hover:overflow-x-visible overflow-y-hidden px-8"
        >
          <div
            onClick={() => ref.current.scrollBy(-100, 0)}
            className="z-10 left-2 top-[100px] absolute flex items-center cursor-pointer hover:scale-150 "
          >
            <ScrollLeftArrow/>
          </div>
          {dataReviews?.searchReview.data.map((item: any) => (
            <StaisticsContainer
              title={item?.idTraining?.name}
              className="flex-1 min-h-[250px] min-w-[180px] max-w-[250px] rounded-xl p-4 "
              text={item?.text}
              trainer={item?.idTraining?.idTrainer?.fullName}
              category={item?.idTraining?.idCategory?.name}
              subCategory={item?.idTraining?.idSubCategories?.name}
            />
          ))}
          <div
            onClick={() => ref.current.scrollBy(100, 0)}
            className="z-10 absolute right-2 top-[100px]  flex items-center cursor-pointer  hover:scale-150 "
          >
            <ScrollRightArrow />
          </div>
        </div>
      </div>
        </div>
      )}
      <button
        className={`fixed bottom-5 ${readSectionActive ? 'right-1' : '-right-24'}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <img alt="up" src={Up} height={30} />
      </button>
    </>
  );
};

export default DetailsContainer;
