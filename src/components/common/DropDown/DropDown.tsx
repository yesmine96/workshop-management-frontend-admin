import { RefObject, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'utils/classNames';
import useOnclickOutside from 'hooks/useOnclickOutside';
import { useListener } from 'hooks/useListener';

interface DropDownProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: React.ReactNode;
  anchorEl: RefObject<HTMLElement | null>;
  open: boolean;
  onClose?: () => void;
  left?: number | any;
  top?: number;
  screen?: boolean;
  className?: string;
  full?: boolean;
  position?: { left?: number; top?: number };
}

const DropDown = ({
  open,
  children,
  anchorEl,
  left: leftProps = 0,
  top: topProps = 0,
  className,
  full,
  screen,
  position,
  onClose = () => {},
  ...rest
}: DropDownProps) => {
  const toggleSetting = () => onClose();
  const dropDownRef = useRef<HTMLDivElement>(null);
  const [updatePosition, setUpdatePosition] = useState({ left: 0, bottom: 0, width: 0, right: 0 });
  useOnclickOutside(toggleSetting, dropDownRef, anchorEl);

  useEffect(() => {
    setTimeout(() => {
      if (anchorEl.current) {
        setUpdatePosition(anchorEl.current.getBoundingClientRect());
      }
    }, 0);
  }, [anchorEl.current]);

  useListener('resize', () => {
    if (anchorEl.current) {
      setUpdatePosition(anchorEl.current.getBoundingClientRect());
    }
  });

  if (!open) return null;
  return ReactDOM.createPortal(
    <div
      {...rest}
      ref={dropDownRef}
      style={{
        // eslint-disable-next-line
        top: position?.top !== undefined ? position.top : updatePosition.bottom + topProps,
        left: screen // eslint-disable-line
          ? '0px !important'
          : position?.left !== undefined
          ? position.left
          : updatePosition.left + leftProps, // eslint-disable-line
        width: screen ? '100%' : full ? updatePosition.width : undefined, // eslint-disable-line
      }}
      className={classNames('absolute z-10 rounded-b-lg bg-white ', className)}
    >
      {children}
    </div>,
    document.getElementById('drop_down_root') as any,
  );
};

export default DropDown;
