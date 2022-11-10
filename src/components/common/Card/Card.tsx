import Button from 'components/Button';
import Plus from 'components/icons/Plus';
import cardIdContext from 'contexts/CardIdContext';
import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'utils/classNames';
import classes from './Card.module.scss';

interface CardProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  title: string;
  trainer?: string;
  trainingId?: string;
  price?: string;
  deviceType?: string;
  trainingPhoto?: string;
  from?: string;
  typeVideoOpen?: (open: boolean) => void;
  videoData?: { seringue: string; stylo: string; QRseringue: string; QRstylo: string; url: string; qrCode: string };
  medidineDescription?: { classe: string; price: string; device: string; dosage: string };
  classNameButton?: string;
  details?: boolean;
  date?: string;
  heure?: string;

}

const Card: React.FC<CardProps> = ({
  title,
  trainingId,
  trainer,
  className,
  trainingPhoto,
  deviceType,
  from,
  price,
  typeVideoOpen,
  medidineDescription,
  classNameButton,
  details,
  date,
  heure,
  ...rest
}) => {
  const location = useLocation();
  const { setCardId } = useContext(cardIdContext);
  return (
    <div
      id={trainingId}
      className={classNames(
        `flex flex-col text-blue-600 hover:text-white bg-white rounded-5 w-full`,
        'hover:border-green border border-grey hover:bg-green ',
        classes.container,
        !location.pathname.includes('/indications') ? classes.containerAdjusted : classes.containerAdjustedMin,
        className,
      )}
    >
      <div
        {...rest}
        className={classNames('', classes.backgroundImage)}
        style={{
          backgroundImage: `url(${trainingPhoto})`,
        }}
      >
        <div className={classNames('relative', classes.video)}>
          {/* eslint-disable-next-line */}
          <img alt="fdsf" src={trainingPhoto} className="object-contain w-auto h-275 hidden" />
        </div>

        <div className={classNames('gap-3  flex-col items-center justify-center hidden h-60 ', classes.btns)}>
          <Link
            target={from === 'question' ? '_blank' : '_parent'}
            to={{
              pathname: `/training/${trainingId}`,
              search: from ? `${location.search}&from=${from}` : location.search,
            }}
            className="w-9/12"
          >
            <Button
              className=" w-full text-left"
              onClick={() => {
                setCardId(trainingId || '');
              }}
              variant="quaternary"
              size="sm"
            >
              <div className="flex items-center  gap-1 w-full px-4">
                <div className="w-6">
                  <Plus height={20} width={17} />
                </div>

                <div className={classNames(`w-28 xl:text-sm`, classNameButton)}> Voir détails</div>
              </div>
            </Button>
          </Link>
    
        </div>
      </div>
      <div>
        <div className="text-base px-3 py-2 pb-0">
          <div className="font-bold">
            {' '}
            {title?.split('®').map((e: any, index: number, array: any) => (
              <>
                {e}
                {array.length > 1 && index !== array.length - 1 && <span className="text-3xl">®</span>}
              </>
            ))}
          </div>

          <div className='text-sm py-1'><span className='font-bold'>Formateur(trice): </span> {trainer}</div>
          {true && <div className="text-sm pb-1"><span className='font-bold'>Prix: </span>  {price?.replace(/^./, price[0].toUpperCase())}</div>}
          <div className='text-xs pb-1'>{date} </div>
          <div className='text-xs '>{heure} </div>

          
        </div>

        {/* <div className=" w-full">
          <div className="flex font-medium px-3 pt-1 pb-3">
            <div
              className={classNames(
                'flex-1 mr-2 text-blue-950 text-xs 3_5xl:text-lg pt-3',
                trainer?.trim().split(' ').length === 1 && 'truncate',
                classes.trainer,
              )}
            >
              {trainer}
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Card;
