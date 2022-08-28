import { FC } from 'react';

import Modal from 'components/common/Modal/Modal';
import Button from 'components/ux/Button';
import { toast } from 'react-toastify';

interface DeleteModalProps {
  onClose: (updated: boolean) => void;
  deleteCall: () => any;
  msg?: string;
  id?: any;
}

const DeleteModal: FC<DeleteModalProps> = ({ onClose, deleteCall, id, msg }) => {
  const [deleteData, { loading }] = deleteCall();
  const onDelete = () => {
    if (id)
      deleteData({ variables: { ids: id } }).then(() => {
        onClose(true);
        toast.success('Efface avec success');
      });
  };

  return (
    <>
      <Modal onClose={() => onClose(true)} open={id?.length > 0} className="lg:w-4/5 lg:h-1/2">
        <div className="flex flex-col items-center pb-11 pt-24 w-5/6">
          <div className="text-2xl py-9 text-blue font-CalibreSemiBold  text-center ">{msg}</div>
          <div className="flex gap-4 w-5/6">
            <Button
              className="cursor-pointer flex-1 w-auto bg-blue-100 text-white
              duration-300 hover:border-blue-100 hover:bg-white hover:text-blue-100 hover:border hover:border-blue-100"
              onClick={() => {
                onDelete();
              }}
            >
              {loading ? 'Suppression...' : <div className="cursor-pointer flex-1 w-auto">Oui</div>}
            </Button>
            <Button
              className="
           border border-blue-100 hover:bg-blue-100 hover:text-white text-blue-100 
            cursor-pointer hover:text-white flex-1 w-auto"
              onClick={() => onClose(true)}
            >
              Non
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

DeleteModal.defaultProps = {
  msg: '',
  id: [],
};

export default DeleteModal;
