import React, { FC } from 'react';
import classNames from 'utils/classNames';

interface Props {
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  className?: string;
  iconColor?: string;

  onClick?: () => void;
}
const IconContainer: FC<Props> = ({ Icon, className, onClick, iconColor }: Props) => {
  return (
    <div
      className={classNames('w-[42px] h-[42px] rounded-[12px]  flex justify-center items-center', className)}
      onClick={onClick}
    >
      <Icon fill={iconColor} />
    </div>
  );
};

export default IconContainer;
