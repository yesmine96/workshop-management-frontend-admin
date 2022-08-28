import { useListener } from 'hooks/useListener';
import useOnclickOutside from 'hooks/useOnclickOutside';
import { RefObject, useEffect, useRef, useState } from 'react';
import classNames from 'utils/classNames';

interface DropDownProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: React.ReactNode;
  anchorEl: RefObject<HTMLElement | null>;
  open: boolean;
  onClose?: () => void;
  className?: string;
  top?: number;
  left?: number;
  right?: number;
}

const DropDown = ({
  open,
  children,
  anchorEl,
  className,
  top,
  left,
  right,

  onClose = () => {},
  ...rest
}: DropDownProps) => {
  const toggleSetting = () => onClose();
  const dropDownRef = useRef<HTMLDivElement>(null);
  const [updatePosition, setUpdatePosition] = useState({
    left: 0,
    bottom: 0,
    width: 0,
  });
  useOnclickOutside(toggleSetting, dropDownRef, anchorEl);
  useEffect(() => {
    setTimeout(() => {
      if (anchorEl.current) {
        setUpdatePosition(anchorEl.current.getBoundingClientRect());
      }
    }, 0);
  }, [anchorEl.current]); // eslint-disable-line

  useListener('resize', () => {
    if (anchorEl.current) {
      setUpdatePosition(anchorEl.current.getBoundingClientRect());
    }
  });

  if (!open) return null;
  const mesures: any = {
    // eslint-disable-next-line
    top: top || updatePosition.bottom,
    width: updatePosition.width,
    // eslint-disable-line
  };
  if (left || left === 0) mesures.left = left;
  return (
    <div
      {...rest}
      ref={dropDownRef}
      style={mesures}
      className={classNames('absolute z-10 rounded-b-lg bg-white shadow-2', className)}
    >
      {children}
    </div>
  );
};

DropDown.defaultProps = {
  onClose: () => {},
  className: '',
};
export default DropDown;
