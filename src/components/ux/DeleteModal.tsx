import { FC, useEffect, useState } from 'react';

import Modal from 'components/common/Modal/Modal';
import Button from 'components/Button';
import IconDelete from 'components/icons/IconDelete';
import ConfirmationModal from 'components/ux/ConfirmationModal';
import { Spinner } from 'utils/loading';

interface DeleteModalProps {
  onClose: (updated: boolean) => void;
  deleteCall: () => any;
  msg?: string;
  id?: string;
  confirmationMsg: string;
}

const DeleteModal: FC<DeleteModalProps> = ({ confirmationMsg, onClose, deleteCall, id, msg }) => {
  const [deleteData, { data, loading }] = deleteCall();
  const [msgConfirmationModal, setMsgConfirmationModal] = useState<string>('');
  const onDelete = () => {
    if (id)
      deleteData({ variables: { id } }).then(() => {
        onClose(true);
      });
  };
  useEffect(() => {
    if (data) {
      setMsgConfirmationModal(confirmationMsg);
    }
  }, [data]);

  return (
    <>
      <Modal onClose={() => onClose(true)} open={!!id} className="lg:w-4/5 lg:h-1/2">
        <div className="flex flex-col items-center pb-11 pt-24 w-5/6">
          <IconDelete height={29} />
          <div className="text-2xl py-9 text-blue-600 font-semibold text-center ">{msg}</div>
          <div className="flex gap-4 w-5/6">
            <Button
              variant="primary"
              className="cursor-pointer flex-1 w-auto"
              onClick={() => {
                onDelete();
              }}
            >
              {loading ? (
                <Spinner name="line-scale-pulse-out-rapid" color="white" />
              ) : (
                <div className="cursor-pointer flex-1 w-auto">Oui</div>
              )}
            </Button>
            <Button variant="senary" className="cursor-pointer flex-1 w-auto" onClick={() => onClose(true)}>
              <div>Non</div>
            </Button>
          </div>
        </div>
      </Modal>
      <ConfirmationModal
        onClose={() => {
          setMsgConfirmationModal('');
        }}
        open={msgConfirmationModal !== ''}
        msg={msgConfirmationModal}
      >
        <IconDelete fill="#323232" width="35px" />
      </ConfirmationModal>
    </>
  );
};

export default DeleteModal;
