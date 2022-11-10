import { FunctionComponent } from 'react';
import classNames from 'utils/classNames';

export type trainingProps = {
  name?: string | undefined;
  classe?: { id: string; name: string } | undefined;
  classeFull?: string | undefined;
  dci?: { id: string; name: string } | undefined;
  lab?: string | undefined;
  presentation?: { titleText: string; list: string[] } | undefined;
  actionModality?: string | undefined;
  Indications?:
    | {
        mainIndication: string;
        subIndication: string[];
      }[]
    | undefined;
  doseAdaption?: { title: string; list: string[] }[] | undefined;
  AdministrationMode?: string | undefined;
  frequencyInjection?:
    | {
        name: string;
        notice: string;
      }
    | undefined;
  predictifFactors?:
    | {
        header: string;
        sections: string[];
        notice: string;
      }
    | undefined;
  sideEffects?: string | undefined;
  EffectivenessEvaluation?: string[] | undefined;
  treatmentDuration?: string | undefined;
  PregnancyBreastFeeding?:
    | {
        notice: string;
        pregnancy: string;
        breastFeeding: string;
      }
    | undefined;
  Price?:
    | {
        mainPrice: string;
        price: string[];
      }
    | undefined;
  refund?:
    | {
        value: string;
        notices: string[];
      }
    | undefined;
  opinion?: string | undefined;
  rcp?: string | undefined;
  sameClasses?: string | undefined;
  classesAndIndications?: string | undefined;
  otherClassesAndIndications?: string | undefined;
  video?:
    | {
        url: string;
        qrCode: string;
      }
    | undefined;
  image?: string | undefined;
  tableImage?: string | undefined;
  col?: boolean;
};

const trainingTable3: FunctionComponent<trainingProps> = ({
  name,
  classe,
  classeFull,
  dci,
  lab,
  presentation,
  actionModality,
  Indications,
  AdministrationMode,
  frequencyInjection,
  predictifFactors,
  sideEffects,
  EffectivenessEvaluation,
  treatmentDuration,
  PregnancyBreastFeeding,
  Price,
  refund,

  sameClasses,
  classesAndIndications,
  otherClassesAndIndications,
  video,
  image,
  col,
  rcp,
  opinion,
  tableImage,
  ...rest
}) => {
  const colummB = [
    {
      title: 'Grossesse - allaitement :',
      des: '',
      des2: PregnancyBreastFeeding?.notice,
      des3: PregnancyBreastFeeding?.pregnancy,
      des4: PregnancyBreastFeeding?.breastFeeding,
    },
    {
      title: 'Prix  :',
      des: Price?.mainPrice,
      list: Price?.price,
    },
    {
      title: 'Remboursement Sécurité Sociale  :',
      des: refund?.value,
      list: refund?.notices,
    },
    {
      title: 'Avis de la commission de transparence HAS:',
      link: opinion,
      classname: 'sm:text-sm',
    },
    {
      title: "RCP agence européenne du médicament (RCP de l'EMA)",
      link: rcp,
      classname: 'sm:text-sm',
    },

    {
      title: 'Classe identique  :',
      des: sameClasses,
      classname: 'sm:text-sm',
    },
    {
      title: 'Comparateur : Classe identique - indication identique:',
      des: classesAndIndications,
      classname: 'sm:text-sm',
    },
    {
      title: 'Comparateur : Autres classes - indication identique :',
      des: otherClassesAndIndications,
      classname: 'sm:text-sm',
    },
  ].filter((e) => e.des?.length || e.des3?.length || e.des2?.length || e.list?.length || e.link?.length);

  return (
    <div
      className={classNames(
        'flex flex-col   w-full 	border lg:border-l lg:border-t-0 rounded-r-lg	 border-blue-250 border-l-0 sm:px-1 mr-8',
      )}
      {...rest}
    >
      {/* <div className={classNames('flex flex-row lg:flex-col justify-start  w-full ')}> */}
      {true && (
        <div className="flex flex-col justify-center px-2 py-2 sm:text-left sm:px-0">
          {colummB.map((i) => (
            <div
              className="text-sm 2xl:text-sm  2xl:leading-6 3xl:leading-6 px-3 sm:px-0 md:w-11/12 text-justify sm:text-left 
              "
            >
              {i.title === 'Grossesse - allaitement :' ? <p className="mt-0" /> : <p className="mt-2" />}

              <span className={`font-bold text-blue-600 ${i?.classname}`}>{i.title} </span>

              {i.des && (
                <span className="font-sans text-blue-600 whitespace-normal  pl-1 ">
                  {' '}
                  {i.des[0].toUpperCase() + i.des.substring(1)}{' '}
                </span>
              )}
              <br />
              {i.des2 && (
                <span className="font-sans text-blue-600 whitespace-normal  pl-1 ">
                  {' '}
                  {i.des2[0].toUpperCase() + i.des2.substring(1)}{' '}
                </span>
              )}
              {i.des3 && (
                <span className="font-sans text-blue-600 whitespace-normal  pl-1 ">
                  {' '}
                  {i.des3[0].toUpperCase() + i.des3.substring(1)} <br />{' '}
                </span>
              )}
              {i.title === 'Grossesse - allaitement :' ? <p className="mt-4" /> : <p className="mt-2" />}
              {i.des4 && <span className="font-sans text-blue-600 whitespace-normal white  pl-1 "> {i.des4} </span>}
              {i.link && (
                <>
                  {i.link?.split('||').map((e: any) => (
                    <div>
                      <a
                        href={e}
                        target="_blank"
                        rel="noreferrer"
                        className="font-sans text-blue-600 whitespace-normal sm:text-sm  break-all underline "
                      >
                        {' '}
                        {e}
                      </a>
                    </div>
                  ))}
                </>
              )}
              {i.list &&
                i.list.map((e) => (
                  <span className="font-sans text-blue-600 whitespace-normal pl-4 sm:pl-0">
                    {' '}
                    - {e[0].toUpperCase() + e.substring(1)}
                    <br />
                  </span>
                ))}
            </div>
          ))}
        </div>
      )}
      {/* </div> */}
    </div>
  );
};
export default trainingTable3;
