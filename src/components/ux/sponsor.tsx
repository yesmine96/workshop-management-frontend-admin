// import astra from 'assets/png/AstraZeneca.png';
// import gsk from 'assets/png/gsk.png';
import sano from 'assets/svg/sanofiLogo.svg';
import { FC } from 'react';
import classNames from 'utils/classNames';
import classes from './sponsor.module.scss';

export const Sponsor: FC<React.HTMLProps<HTMLElement>> = () => {
  const images = [
    // { img: astra, className: 'mb-2 2xl:mb-4 h-8 lg:h-10 sm:h-7' },
    // { img: gsk, className: 'h-8 2xl:mb-2 lg:h-10 sm:h-7 ml-4' },
    { img: sano, className: 'h-14 lg:h-14 sm:h-12' },
  ];
  return (
    <div
      className={classNames(
        'sm:gap-1   grid  sm:h-8 grid-flow-col	',
        'h-16 lg:pl-2.5 lg:pr-1 sm:px-0 py-2 2xl:h-10',
        'rounded-5 bg-white lg:content-center w-190  items-center content-center',
      )}
    >
      <div className="font-medium text-sm flex  gap-1  sm:text-xs text-grey-500 pr-2">
        Avec le soutien institutionnel des Laboratoires{' '}
      </div>
      <div className="flex h-9/12 lg:h-full gap-1 lg:gap-0 lg:grid lg:grid-flow-col justify-self-end w-full items-center">
        {images.map(({ img, className }, i) => (
          // eslint-disable-next-line
          <img key={i} className={classNames(`object-contain    ${className}`, classes.image)} src={img} alt="" />
        ))}
      </div>
    </div>
  );
};
