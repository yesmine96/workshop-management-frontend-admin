import React, { useState } from 'react';
import Close from 'components/icons/Close';
import PreviewIcon from 'components/icons/Preview';

export default function ImagePreview({ ...props }) {
  const { src } = props;
  const [preview, setpreview] = useState(false);
  const [open, setopen] = useState(false);
  return (
    <div
      className="relative rounded-lg mt-3  "
      onMouseEnter={() => setpreview(true)}
      onMouseLeave={() => setpreview(false)}
    >
      {preview ? (
        <div
          className="rounded-lg absolute w-full h-full flex items-center justify-center"
          style={{ boxShadow: 'inset 13px 18px 192px 93px rgb(0 0 0 / 70%)' }}
        >
          <div className=" cursor-pointer  flex justify-center items-center">
            <PreviewIcon
              fill="white"
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
              className="ml-1 text-sm underline cursor-pointer text-white font-bold"
            >
              Agrandir l'image
            </p>
          </div>
        </div>
      ) : null}
      {open && (
        <div className="fixed  bg-green-200  z-10 flex justify-center items-center h-full w-full top-0 right-0">
          <Close
            fill="white"
            onClick={() => setopen(false)}
            className="absolute top-8 right-8 cursor-pointer hover:h-8"
            height={25}
          />
          <img src={src} alt="dssd" className=" 4xl:p-48 3xl:p-48 xl:p-48 lg:p-0  md:p-0  lg:w-full w-auto h-auto" />
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
