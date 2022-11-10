import useSingleAndDoubleClick from 'components/common/DoubleClick/DoubleClick';
import ArrowVideo from 'components/icons/ArrowVideo';
import LinkIcon from 'components/icons/LinkIcon';
import QRCode from 'components/icons/QRCode';
import React, { useRef, useState } from 'react';
import classNames from 'utils/classNames';
import FullscreenIcon from '../../../assets/png/fullscreen.svg';
import unFullscreenIcon from '../../../assets/png/unfullscreen.svg';
import next from './assets/enabled/next.svg';
import pause from './assets/enabled/pause.svg';
import play from './assets/enabled/play.svg';
import previous from './assets/enabled/previous.svg';
import volumeIcon from './assets/enabled/volume.svg';
import classes from './VideoCard.module.scss';
import classes2 from './VideoPlayer.module.scss';

interface Props {
  videoUrl: string;
  videoQrcode: string;
  trainingName: string | undefined;
  deviceType: string | undefined;
  fullscreen: boolean;
  setfullscreen: (v: boolean) => void;
}

const VideoPlayer = ({ videoUrl, videoQrcode, deviceType, trainingName, fullscreen, setfullscreen }: Props) => {
  const [PlayState, setPlayState] = useState(false);
  const [currentTimeState, setcurrentTimeState] = useState('0:00');
  const [currentDurationState, setcurrentDurationState] = useState('0:00');
  const [right, setright] = useState(false);
  const [left, setleft] = useState(false);

  const VideoPlayerRef = useRef<HTMLDivElement>(null);
  const VideoRef = useRef<HTMLVideoElement>(null);
  const videoProgressFilledRef = useRef<HTMLDivElement>(null);
  const videoProgressRef = useRef<HTMLDivElement>(null);

  const playPauseFucntion = () => {
    if (!PlayState) {
      VideoRef?.current?.play();
      setPlayState(true);
    } else {
      VideoRef?.current?.pause();
      setPlayState(false);
    }
  };

  const ProgressBarClickUpdate = (e: any) => {
    if (VideoRef.current && videoProgressRef.current) {
      const progressTime = (e.nativeEvent.offsetX / videoProgressRef.current.offsetWidth) * VideoRef.current.duration;
      VideoRef.current.currentTime = progressTime;
    }
  };
  const volumeFunction = (e: any) => {
    if (VideoRef.current) {
      VideoRef.current.volume = e.target.value;
    }
  };
  const forwardTenSecond = () => {
    setleft(true);

    if (VideoRef.current) {
      VideoRef.current.currentTime += 10;
    }
    setTimeout(() => {
      setleft(false);
    }, 1000);
  };
  const backwardTenSecond = () => {
    setright(true);

    if (VideoRef.current) {
      VideoRef.current.currentTime -= 10;
    }
    setTimeout(() => {
      setright(false);
    }, 1000);
  };

  const currentTime = () => {
    if (VideoRef.current && videoProgressFilledRef.current) {
      const currentMinutes = Math.floor(VideoRef.current.currentTime / 60);
      const currentSeconds = Math.floor(VideoRef.current.currentTime - currentMinutes * 60);
      const durationMinutes = Math.floor(VideoRef.current.duration / 60);
      const durationSeconds = Math.floor(VideoRef.current.duration - durationMinutes * 60);
      // eslint-disable-next-line
      setcurrentTimeState(`${currentMinutes}:${currentSeconds < 10 ? '0' + currentSeconds : currentSeconds}`);
      setcurrentDurationState(`${durationMinutes}:${durationSeconds}`);
      // Progress Bar
      const percentage = (VideoRef.current.currentTime / VideoRef.current.duration) * 100;
      videoProgressFilledRef.current.style.width = `${percentage}%`;
    }
  };

  function downloadFile(filePath: string) {
    const link = document.createElement('a');
    link.href = filePath;
    link.target = '_blank';
    link.download = filePath.substr(filePath.lastIndexOf('/') + 1);
    link.click();
    link.remove();
  }

  const DoubleclickLeft = useSingleAndDoubleClick(() => () => {}, forwardTenSecond);
  const DoubleclickRight = useSingleAndDoubleClick(() => () => {}, backwardTenSecond);

  return (
    <>
      {/* eslint-disable-next-line */}
      <div
        ref={VideoPlayerRef}
        className={classNames(
          `videoPlayer transition-opacity  duration-700 fulll w-full h-full  relative`,
          fullscreen && classes.fullscreenVideo,
          classes.videoPlayer,
        )}
      >
        <div className="swipe absolute w-full h-full z-50">
          <div className="doubleClick relative h-full w-10/12 ">
            {/* d */}
            <div onClick={DoubleclickRight} className={classNames('absolute h-full w-1/2 left-0')} />
            <div
              onClick={DoubleclickRight}
              className={classNames(
                ' doubleclickRight flex justify-center items-center absolute h-full w-1/2 left-0',
                right ? 'opacity-100' : 'opacity-0',
                classes2.doubleclickRight,
              )}
            >
              <p className="text-white text-42">-10 s</p>
            </div>

            <div onClick={DoubleclickLeft} className="absolute h-full w-1/2 right-0" />
            <div
              onClick={DoubleclickLeft}
              className={classNames(
                ' doubleclickLeft flex justify-center items-center absolute h-full w-1/2 right-0',
                left ? ' opacity-100' : 'opacity-0',
                classes2.doubleclickLeft,
              )}
            >
              <p className="text-white text-42 ">+10 s</p>
            </div>
          </div>

          <div>
            <button
              className={classNames(
                classNames('relative hoverButtons  pr-4 flex justify-center items-center ', PlayState && 'hidden'),
                classes.hoverButtons,
                classes.hoverButtons1,
              )}
              onClick={() => {
                navigator?.clipboard?.writeText(videoUrl);
              }}
            >
              <div
                className={classNames('hoverText linkSVG text-sm w-full lg:text-xs pr-2 lg:pr-1', classes.hoverText)}
              >
                Copier le lien de la vidéo
              </div>
              {/* eslint-disable-next-line */}
              {<LinkIcon className={classNames('absoltue right-3 qrClass h-8 xl:h-5 ')} />}{' '}
            </button>
            <button
              className={classNames(
                classNames('relative hoverButtons  pr-4 flex justify-center items-center  ', PlayState && 'hidden'),
                classes.hoverButtons,
                classes.hoverButtons2,
              )}
              onClick={() => downloadFile(`${process.env.REACT_APP_PHOTO_API}/uploads/pdf/unique/${videoQrcode}`)}
            >
              <div
                className={classNames('hoverText linkSVG text-sm w-full lg:text-xs pr-2 lg:pr-1', classes.hoverText)}
              >
                QR Code{' '}
              </div>
              {/* eslint-disable-next-line */}
              <QRCode className="absoltue  right-3 qrClass h-8 xl:h-5" />
            </button>
            <button
              className={classNames(
                classNames('relative hoverButtons  pr-4 flex justify-center items-center  ', PlayState && 'hidden'),
                classes.hoverButtons,
                classes.hoverButtons3,
              )}
              onClick={() => downloadFile(`${process.env.REACT_APP_PHOTO_API}/uploads/pdf/planche/${videoQrcode}`)}
            >
              <div
                className={classNames('hoverText linkSVG text-sm w-full lg:text-xs pr-2 lg:pr-1', classes.hoverText)}
              >
                Planche de QR Code{' '}
              </div>
              {/* eslint-disable-next-line */}
              <QRCode className="absoltue  right-3 qrClass h-7 xl:h-5" />
            </button>
          </div>
          <ArrowVideo
            fill="#00A1A2"
            className={classNames(
              ' playArrow cursor-pointer absolute   h-12 xl:8',
              PlayState && 'hidden',
              classes2.playArrow,
            )}
            onClick={playPauseFucntion}
          />
        </div>

        {/* eslint-disable-next-line */}
        <video
          ref={VideoRef}
          onTimeUpdate={currentTime}
          id="myVideo"
          src={videoUrl}
          poster="YOUR-POSTER.png"
          className={classNames(
            'w-full  video bg-white overflow-hidden border border-blue-400',
            classes.myVideo,
            fullscreen && ' h-11/12 lg:h-full',
          )}
        ></video>
        <div
          className={classNames(
            'playerControls flex relative z-50 justify-evenly bottom-2 items-center w-full flex-wrap',
            classes.playerControls,
          )}
        >
          <div className={classNames('videoTitle hideSection text-sm ', classes.hideSection, classes.videoTitle)}>
            <h6>{trainingName}</h6>
            <p className="hidden">{deviceType}</p>
          </div>

          <div
            ref={videoProgressRef}
            onClick={ProgressBarClickUpdate}
            className={classNames(
              `${`videoProgress relative flex cursor-pointer  h-2	rounded rounded-48	bg-grey-500 md:ml-4 ${
                fullscreen && 'flex-initial'
              }`}`,
              classes.videoProgress,
            )}
          >
            <div
              ref={videoProgressFilledRef}
              className={classNames(
                'videoProgressFilled relative overflow-hidden bg-yellow z-50 w-0 rounded rounded-48',
                classes.videoProgressFilled,
              )}
            />
          </div>
          <div className="flex items-center  px-4 justify-end">
            <div className="time text-white text-10 ">
              <span className="current text-10 text-white ">{currentTimeState}</span> /{' '}
              <span className="duration text-10 text-white">{currentDurationState}</span>
            </div>
            <div className={classNames('ButtonSection flex justify-end items-center gap-2', classes.ButtonSection)}>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setfullscreen(!fullscreen)}
                  className={classNames('playerButton p-px', classes.playerButton)}
                >
                  <img
                    className={classNames('m-auto h-3 items-center justify-center flex')}
                    alt="previous"
                    src={fullscreen ? unFullscreenIcon : FullscreenIcon}
                  />
                </button>

                <button
                  className={classNames(
                    'playerButton volumeButton p-px flex justify-center items-center relative lg:hidden',
                    classes.playerButton,
                    classes.volumeButton,
                    classes2.volumeButton,
                  )}
                >
                  <input
                    onChange={volumeFunction}
                    type="range"
                    className={classNames('volume absolute transform -rotate-90 m-0 w-0 p-0', classes2.volume)}
                    min={0}
                    max={1}
                    step="0.01"
                    defaultValue={1}
                  />
                  <img
                    className={classNames('m-auto h-3 xl:h-2 items-center justify-center flex')}
                    alt="previous"
                    src={volumeIcon}
                  />
                </button>
              </div>

              {/* NEXT PREVIOUS BUTTON */}
              {false && (
                <div className="flex items-center justify-center ">
                  <button
                    onClick={backwardTenSecond}
                    className={classNames(
                      ' backwardArrow playerButton p-px',
                      classes.backwardArrow,
                      classes.playerButton,
                    )}
                  >
                    <img
                      className={classNames('m-auto h-2 items-center justify-center flex')}
                      alt="previous"
                      src={previous}
                    />
                  </button>
                  <button
                    onClick={forwardTenSecond}
                    className={classNames(
                      ' forwardArrow playerButton p-px',
                      classes.backwardArrow,
                      classes.playerButton,
                    )}
                  >
                    <img className={classNames('m-auto  h-2 items-center justify-center flex')} alt="next" src={next} />
                  </button>
                </div>
              )}
              {/* PLAY PAUSE BUTTON */}
              <button
                onClick={playPauseFucntion}
                className={classNames('playButton flex justify-center items-center', classes.playButton)}
                title="Play"
              >
                {/* ► */}
                {PlayState ? (
                  <img alt="imgPause" height="18px" src={pause} />
                ) : (
                  <img alt="imgPlay" height="18px" src={play} />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoPlayer;
