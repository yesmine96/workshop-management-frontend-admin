/* eslint-disable no-nested-ternary */
import ImagePreview from 'components/common/PreviewImage/ImagePreview';
import { FunctionComponent, useEffect, useState } from 'react';
import classNames from 'utils/classNames';

export type TrainingProps = {
  classe?: { id: string; name: string } | undefined;
  name?:string,
  date?:string,
  heure?:string,
  trainer?:string,
  cat?:string,
  image?:string
  subCat?:string,
  description?:string,

}


const trainingTable: FunctionComponent<TrainingProps> = ({
  name,
  classe,
  date,
  heure,
  trainer,
  cat,
  subCat,
  image,
  description,
  ...rest
}) => {
  const TopColum = [
    {
      title: 'Nom de la formation :',
      des: name,
    },
    {
      title: 'Durée de la formation :',
      des: date
    },
    {
      title: 'Heure de la formation :',
      des: heure,
    },
    {
      title: ' Nom du formateur :',
      des: trainer,
    },
    {
      title: 'Catégorie:',
      des: cat,
    },
    {
      title: "Sous-catégorie:",
      des: subCat,
    },
    {
      title: "Déscription",
      des: description,
    },
    
  ];

  const isBrowser = typeof window !== 'undefined';
  const [width, setWidth] = useState(isBrowser ? window.innerWidth : 0);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  return (
    <div
      className={classNames(
        'flex flex-col relative justify-center items-start w-full border lg:border-b-0	rounded-5 border-blue-250 p-4 sm:p-1',
      )}
      {...rest}
    >
    
      <div className={classNames('flex flex-row lg:flex-col justify-start items-start w-full ')}>
        {true && (
          <div className="flex flex-col gap-1 justify-center items-start w-full  	">
            {TopColum.map((i) => (
              <div className="text-sm 2xl:text-sm whitespace-nowrap 2xl:leading-6 3xl:leading-6 w-full">
                <span className="font-bold text-blue-600 ">{i?.title} </span>
                <span className="font-sans text-blue-600 whitespace-normal"> {i?.des} </span>
               
                <br />
              </div>
            ))}
            {width < 1000 && <ImagePreview src={image} alt="fdfs" className="rounded-5 w-100 m-auto m-1" />}

         
          

      
          </div>
        )}
      </div>
    </div>
  );
};
export default trainingTable;
