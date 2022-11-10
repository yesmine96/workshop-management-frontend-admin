import Cancel from 'components/icons/Cancel';
import { useRef } from 'react';
import { createPortal } from 'react-dom';

import { Transition } from 'react-transition-group';
import classNames from 'utils/classNames';

import Error from 'components/icons/Error';

import classes from './snackbar.module.scss';

interface SnackbarProps {
  message: string;
  open: boolean;
  onClose?: () => void;
}

const Snackbar: React.FC<SnackbarProps> = ({ message, open, onClose }) => {
  const snackbarRef = useRef<HTMLDivElement>(null);

  return (
    <Transition nodeRef={snackbarRef} unmountOnExit mountOnEnter in={open} timeout={225}>
      {(state) => {
        return createPortal(
          <div
            ref={snackbarRef}
            className={classNames(
              'absolute flex items-center right-10 top-10 p-4 rounded',
              'min-w-snackbar max-w-snackbar',
              'bg-red-500 text-white lg:left-1/2',
              'transition-transform ease-out lg:w-10/12 transform -translate-x-1/2',
              state === 'entered' ? classes.open : classes.close,
            )}
          >
            <Error className="mr-4" height={22} />
            <div className="flex-1"> {message}</div>
            <Cancel onClick={onClose} className="cursor-pointer ml-4" stroke="#D85A5A" height={35} />
          </div>,
          document.getElementById('root') as HTMLDivElement,
        );
      }}
    </Transition>
  );
};

export default Snackbar;
