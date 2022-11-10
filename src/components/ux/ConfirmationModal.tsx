import { FC } from 'react';
import Modal from 'components/common/Modal/Modal';

interface ConfirmationModalProps {
  onClose: (updated: boolean) => void;
  open: boolean;
  msg?: string;
}

const ConfirmationModal: FC<ConfirmationModalProps> = ({ onClose, open, msg, children }) => {
  return (
    <Modal onClose={() => onClose(false)} open={open}>
      <div className="flex flex-col items-center pb-11 pt-24 px-4">
        {children}
        <div className="text-2xl py-9 text-blue-600 font-semibold text-center text-22">{msg}</div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
