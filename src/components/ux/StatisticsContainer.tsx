import IconContainer from 'components/ui/Route/IconContainer';
import React, { FC } from 'react';
import classNames from 'utils/classNames';

interface Props {
  Icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  className?: string;
  title: string;
  currentStatus: string;
  field: string;
  refetch: any;
  trainer?: string;
  text?: string;
  category?: string;
  subCategory?: string;
  setcurrentStatus: (status: string) => void;
}
const StaisticsContainer: FC<Props> = ({
  className,
  title,
  setcurrentStatus,
  currentStatus,
  refetch,
  trainer,
  text,
  category,
  subCategory,
}: Props) => {
  const selected = title === currentStatus;

  return (
    <div
      onClick={() => {
        setcurrentStatus(title);
        refetch();
      }}
      className={classNames(
        'bg-gray-200 flex flex-col justify-between p-2 duration-150 cursor-pointer shadow-dropdown hover:shadow-hovered',
        className,
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
      <div className={`py-2 text-Calibre text-[16px] text-sm overflow-auto`}>{text} </div>
    </div>
  );
};

export default StaisticsContainer;
