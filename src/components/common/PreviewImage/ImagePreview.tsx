import React, { useState } from 'react';

import Close from 'components/icons/Close';
import PreviewIcon from 'components/icons/Preview';

export default function ImagePreview({ ...props }) {
  const { src } = props;
  const [preview, setpreview] = useState(false);
  const [open, setopen] = useState(false);
  return (
    <div className="relative   " onMouseEnter={() => setpreview(true)} onMouseLeave={() => setpreview(false)}>
      {preview ? (
        <div
          className=" absolute w-full h-full flex items-center justify-center"
          style={{ boxShadow: 'inset 9px 15px 48px 50px #00000057' }}
        >
          <div className=" cursor-pointer  flex justify-center items-center">
            <PreviewIcon
              fill="#white"
              onClick={() => {
                setopen(true);
                setpreview(false);
              }}
              className=" cursor-pointer hover:h-8"
              height={25}
            />
            {/* eslint-disable-next-line */}
            <p
              onClick={() => {
                setopen(true);
                setpreview(false);
              }}
              className="ml-1 text-sm underline cursor-pointer text-black font-bold"
            >
              Agrandir l'image
            </p>
          </div>
        </div>
      ) : null}
      {open && (
        <div className="fixed !p-[10%]  bg-[#000000bf]   flex justify-center items-center h-full w-full top-0 right-0 z-50">
          <Close
            fill="white"
            onClick={() => setopen(false)}
            className="absolute top-8 right-8 cursor-pointer hover:h-8"
            height={25}
          />
          <img
            src={src}
            alt="dssd"
            className=" p-10 4xl:p-48 3xl:p-48 xl:p-48 lg:p-0  md:p-0  lg:w-full w-auto h-auto"
          />
        </div>
      )}
      {false && (
        <div className="absolute cursor-pointer -bottom-8 right-0 flex justify-center items-center pt-3">
          <PreviewIcon fill="white" onClick={() => setopen(true)} className=" cursor-pointer hover:h-8" height={25} />
          {/* eslint-disable-next-line */}
          <p onClick={() => setopen(true)} className="ml-1 text-10 underline cursor-pointer text-green">
            Agrandir l'image
          </p>
        </div>
      )}
      <img alt="dssd" {...props} />
    </div>
  );
}
