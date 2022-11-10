/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';

import PrevIcon from 'components/icons/ArrowLeft';
import NextIcon from 'components/icons/ArrowRight';

interface CarouselProps {
  images: any[];
}

const Carousel = ({ images, ...rest }: CarouselProps) => {
  const [current, setCurrent] = useState(0);
  const nextSlide = () => {
    setCurrent(current === images?.length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? images?.length - 1 : current - 1);
  };

  const isBrowser = typeof window !== 'undefined';
  const [width, setWidth] = useState(isBrowser ? window.innerWidth : 0);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
  }, []);

  return (
    <div
      className="bg-grey h-full pb-0 rounded-5 border-1 p-8 justify-center items-center border-grey-300 flex flex-col  gap-y-4 "
      {...rest}
    >
      <div className=" flex h-full flex-row justify-center items-center min-h-[350px] 2xl:min-h-[200px] w-10/12	2xl:w-full">
        <PrevIcon width="15px" fill="#0B0329" onClick={prevSlide} className="cursor-pointer " />
        {images?.map((slide, index) => {
          return width >= 1000 ? (
            <>
              {index === current && (
                <div
                  className="h-full w-full min-h-[200px] 2xl:min-h-[200px] 2xl:mx-2 "
                  style={{
                    background: `no-repeat url('${slide}') center center `,
                    backgroundSize: 'contain',
                  }}
                />
              )}
            </>
          ) : (
            <>
              {index === current && (
                <img alt="dsqsqdq" src={`${slide}`} className="h-full w-auto border-5 border-grey-300" />
              )}
            </>
          );
        })}
        <NextIcon onClick={nextSlide} width="15px" className="cursor-pointer" />
      </div>
      {/* <div className="flex gap-x-4 mt-auto">
        {images.map((e, index) => (
          <div
            className={`cursor-pointer border-5  w-auto h-[80px] w-[122px] ${
              index === current ? 'border-blue' : 'border-grey-300'
            }`}
            style={{
              background: `no-repeat url('${e}') center center `,
              backgroundSize: 'cover',
            }}
            onClick={() => {
              setCurrent(index);
            }}
          />
        ))}
      </div> */}
      <div className="font-CalibreSemiBold text-25 text-blue lg:hidden mt-auto py-4">{`${current + 1}/${
        images?.length
      }`}</div>
    </div>
  );
};
export default Carousel;
