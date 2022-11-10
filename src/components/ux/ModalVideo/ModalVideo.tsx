import Modal from 'components/common/Modal/Modal';
import Video from 'components/icons/Video';
import { FC, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import classNames from 'utils/classNames';
import { decodeUri } from 'utils/url';
import classes from './VideoCard.module.scss';
import VideoPlayer from './VideoPlayer';

interface ModalVideoProps {
  onClose: () => void;
  open: boolean;
  title?: string;
  deviceType?: string;
  trainingId?: string;
  videoData: { url: string; qrCode: string };
  medidineDescription?: { classe?: string; dci?: string; device?: string; dosage?: string };
  detail?: boolean;
  from?: string;
}

const ModalVideo: FC<ModalVideoProps> = ({
  onClose,
  open,
  title,
  deviceType,
  trainingId,
  videoData,
  from,
  medidineDescription,
  detail = true,
}) => {
  const history = useHistory();
  const [fullscreen, setfullscreen] = useState(false);
  const location = useLocation();
  const uri = decodeUri(location.search);

  return (
    <Modal
      responsivestate={fullscreen}
      className={classNames(
        'modalContainer  bg-grey-300 w-10/12 lg:w-full lg:h-full lg:w-full   md:p-0 lg:pb-0  lg:rounded-none',
        classes.modalContainer,
      )}
      onClose={onClose}
      open={open}
    >
      <div
        className={classNames(
          'modalContainerChild h-full w-full flex  lg:flex-col-reverse lg:w-screen',
          classes.modalContainerChild,
        )}
      >
        <div
          className={classNames(
            ' text-white bg-green lg:bg-transparent lg:text-blue-600 sm:m-auto sm:w-full lg:px-8 md:px-10 sm:pb-5 lg:pb-16  sm:pt-16  justify-center font-semibold flex flex-col  2xl:px-5 pb-16 pt-32  lg:pb-0 pl-10 pr-5',
            classes.text,
            classes.DescriptionSection,
          )}
        >
          <div>
            <span className="font-bold text-26 2xl:text-lg"> {deviceType} </span>
            <br />
          </div>
          <div className="py-8 ">
            <p className="font-bold text-xl	2xl:text-sm pb-2">Description</p>
            <div className="flex flex-col justify-center items-start text-xs 	">
              <div className="text-sm 2xl:text-xs whitespace-nowrap	">
                <span className="font-medium text-white lg:text-blue-600 ">Classe pharmacothérapeutique : </span>{' '}
                <span className="font-sans text-white font-normal whitespace-normal	lg:text-blue-600">
                  {medidineDescription?.classe?.replace(/^./, medidineDescription?.classe[0].toUpperCase())}{' '}
                </span>
              </div>
              <div className="text-sm 2xl:text-xs whitespace-nowrap	">
                <span className="font-medium text-white lg:text-blue-600">DCI : </span>{' '}
                <span className="font-sans text-white font-normal whitespace-normal	lg:text-blue-600">
                  {medidineDescription?.dci?.replace(/^./, medidineDescription?.dci[0].toUpperCase())}{' '}
                </span>
              </div>
            </div>
          </div>

          {detail && (
            <button
              onClick={() =>
                history.push(`/training/${trainingId}?${from}=${(from && uri[from]) || ''}&from=${from || 'video'}`)
              }
              className={classNames(
                'bg-white lg:bg-green lg:text-white lg:w-full w-1/2 text-blue-750 py-2 px-4 rounded-5 cursor-pointer  w-1/2	hover:bg-black-100 hover:text-white',
                classes.detailButton,
              )}
            >
              <p className="text-base xl:text:sm font-medium">Détails </p>
            </button>
          )}
        </div>
        <div className={classNames('flex flex-col  w-auto h-1/2 bg-grey-300', classes.videoSection)}>
          <div className={classNames('hideSection pb-5 pt-10  pl-8', classes.hideSection)}>
            <p className="flex w-212 items-center font-medium text-green text-22 2xl:text-base">
              <span className="mr-2">
                {' '}
                <Video height="18px" />
              </span>
              Vidéo éducative <br />
            </p>
            <p className="font-bold text-26 2xl:text-lg">{title}</p>
          </div>
          <div
            className={classNames(
              'player flex-1  border-none w-full h-full m-auto px-8 py-0',
              classes.Videoborder,
              classes.player,
            )}
          >
            <VideoPlayer
              fullscreen={fullscreen}
              setfullscreen={setfullscreen}
              trainingName={title}
              deviceType={deviceType}
              videoUrl={videoData?.url}
              videoQrcode={videoData?.qrCode}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalVideo;
