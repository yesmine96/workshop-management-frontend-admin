import React, { FC } from 'react';
import classNames from 'utils/classNames';

interface Props {
  title: string;
  trainer: string;
  text: string;
  category: string;
  subCategory: string;
  className:string
}
const StaisticsContainer: FC<Props> = ({
  title,
  trainer,
  text,
  category,
  subCategory,
  className
}: Props) => {

  return (
    <div
      // onClick={() => {
      //   refetch();
      // }}
      className={classNames(
        'bg-gray-200 flex flex-col justify-between p-2 duration-150 cursor-pointer shadow-dropdown hover:shadow-hovered',
        className
      )}
    >
      <div>
        <div className={`py-2 text-gray text-Calibre text-lg `}>{title}</div>
        <div>
          <div className="text-Calibre font-semibold text-sm ">{category}</div>
          <div className="text-Calibre font-semibold text-sm  ">{subCategory}</div>
        </div>
        <div className="text-Calibre font-semibold text-sm text-[#00458b]">{trainer}</div>
      </div>
      <div className="py-2 text-Calibre text-[16px] text-sm overflow-auto">{text} </div>
    </div>
  );
};

export default StaisticsContainer;
