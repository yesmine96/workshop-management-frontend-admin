import Close from 'components/icons/Close';
import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'utils/classNames';

interface ModalProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: React.ReactNode;
  open: boolean;
  left?: number;
  top?: number;
  className?: string;
  onClose?: () => void;
  containerClassName?: string;
  responsivestate?: boolean;
}

const Modal = ({
  open,
  children,
  className,
  containerClassName,
  onClose,
  responsivestate = false,
  ...rest
}: ModalProps) => {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [open]);

  if (!open) return null;
  return ReactDOM.createPortal(
    <div
      {...rest}
      style={{
        backdropFilter: 'blur(10px)',
      }}
      className={classNames(
        'z-50 flex justify-center items-center fixed w-full h-full top-0 left-0 z-13 backdrop-blur-md overflow-hidden bg-blue-700',
        containerClassName,
      )}
    >
      <div
        className={classNames(
          'flex items-center justify-center relative bg-white w-127 rounded-5 shadow-1',
          className,
          `${responsivestate && 'w-full h-full'}`,
        )}
      >
        <Close
          className={classNames(
            'absolute top-8 right-9 cursor-pointer  z-50 ',
            'ease-linear transform hover:scale-125 transition duration-500 z-50',
          )}
          height={24}
          onClick={onClose}
        />
        {children}
      </div>
    </div>,
    document.getElementById('modal_root') as any,
  );
};

export default Modal;
