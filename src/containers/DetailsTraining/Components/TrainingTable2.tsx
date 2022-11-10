import ImagePreview from 'components/common/PreviewImage/ImagePreview';
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
        from: string;
        mainIndication: string;
        subIndication: { name: string; value: string; list: string[] }[];
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
  treatmentDuration?: string[] | undefined;
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

const trainingTable2: FunctionComponent<trainingProps> = ({
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
  const columnA = [
    {
      title: 'Fréquence des injections  :',
      des: frequencyInjection?.name,
      list: frequencyInjection?.notice.length ? [frequencyInjection?.notice] : undefined,
    },
    {
      title: "Mode d'administration  :",
      des: AdministrationMode,
    },
    {
      title: `Facteurs prédictifs de bonne réponse au ${name} :  `,
      des: predictifFactors?.header,
      des2: predictifFactors?.notice,
      list: predictifFactors?.sections,
    },
    {
      title: 'Effets indésirables  :',
      des: sideEffects,
      img: tableImage,
    },
    {
      title: ' Évaluation de l’efficacité   :',
      list: EffectivenessEvaluation,
    },
    {
      title: 'Durée du traitement :',
      list: treatmentDuration,
    },
  ].filter((e) => e.des?.length || e.des2?.length || e.list?.length);

  return (
    <div
      className={classNames(
        'flex flex-col   w-full 	border lg:border-r lg:border-b-0 lg:border-t-0  rounded-l-lg border-blue-250 border-r-0  ',
      )}
      {...rest}
    >
      {/* <div className={classNames('flex flex-row lg:flex-col justify-start  w-full ')}> */}
      {true && (
        <div className="flex flex-col justify-center sm:text-left  px-2 py-2 sm:px-1">
          {columnA.map((i) => (
            <div className="text-sm 2xl:text-sm  2xl:leading-6 3xl:leading-6 px-3 sm:px-0 md:w-11/12 text-justify sm:text-left ">
              <span className="font-bold text-blue-600">{i.title} </span>
              <br />
              {i.des && (
                <span className="font-sans text-blue-600 whitespace-normal  pl-1 ">
                  {' '}
                  {i.des.trim()[0].toUpperCase() + i.des.trim().substring(1)}{' '}
                </span>
              )}
              {i.img && <ImagePreview src={tableImage} width="80%" alt="" className="rounded-5  w-full" />}
              {i?.list &&
                i.list.map((e) => {
                  return (
                    <div className={classNames('font-sans text-blue-600 whitespace-normal pl-4 sm:pl-0 ')}>
                      {' '}
                      - {e.trim()[0].toUpperCase() + e.trim().substring(1)}
                    </div>
                  );
                })}
              {!!i.des2 && (
                <span className="font-sans font-normal text-blue-600 whitespace-normal">
                  {' '}
                  <b>N.B:</b> {i.des2.trim()[0].toUpperCase() + i.des2.trim().substring(1)}{' '}
                </span>
              )}
              <p className="mt-3" />
            </div>
          ))}
        </div>
      )}
      {/* </div> */}
    </div>
  );
};
export default trainingTable2;
