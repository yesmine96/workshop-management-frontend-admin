import { FunctionComponent, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Input from 'components/ux/Input';
import Button from 'components/Button';
import Modal from 'components/common/Modal/Modal';
import { Note as NoteType } from 'requests/types';
import ConfirmationModal from 'components/ux/ConfirmationModal';
import { useHistory, useLocation, matchPath } from 'react-router-dom';
import { useaddReview } from 'requests/review';

export type ModalProps = {
  open: boolean;
  onClose?: (updated: boolean) => void;
  note?: NoteType;
  training?: any;
  remove?: number;
};

const ModalReview: FunctionComponent<ModalProps> = ({ open, onClose, note ,training}) => {
  const location = useLocation();
  const history = useHistory();
  const [msgConfirmationModal, setMsgConfirmationModal] = useState<string>('');
  const [msgError, setMsgError] = useState<string>('');

  const [addReview,{data,error}] = useaddReview();

  const formik = useFormik({
    initialValues: {
      email:"",
      text:''
    },
    validationSchema: Yup.object({
      text: Yup.string().required('Ce champ est obligatoire'),
      email: Yup.string().required('Ce champ est obligatoire'),
    }),
    onSubmit: async (values) => {
    

   addReview({ variables: {email:values.email,text:values.text
    ,idTraining:training?.id,
    idTrainer:training?.idTrainer?.id,
    idCategory:training?.idCategory?.id,
    idSubCategory:training?.idSubCategories?.id
  }}).then(() => {
    console.log('errrorrr')
    if(error?.message){setMsgError(`${error?.message}`)}
  
    else
{    setMsgConfirmationModal('Votre inscription a bien été prise en compte');
}  });
    },
  });
console.log(location,history,matchPath)


  useEffect(() => {
    setMsgConfirmationModal('');

  }, []);
  useEffect(() => {
    if (data && msgConfirmationModal === '' && matchPath(location.pathname, `/notes/:id`))
      history.push(`/notes`);
  }, [data, msgConfirmationModal]);
  return (
    <>
      <ConfirmationModal
        onClose={() => {
          if (onClose) {
            onClose(false);
            setMsgConfirmationModal('');
          }
        }}
        open={msgConfirmationModal !== ''}
        msg={msgConfirmationModal}
      />
      <Modal
        className="rounded-5 lg:rounded-none
         lg:h-full z-50 relative text-left py-18
          px-8 bg-grey-200 w-539 2xl:w-539	h-661 2xl:h-539	md:p-8"
        onClose={() => {
          if (onClose) {
            onClose(false);
            if (!note) formik.resetForm();
          
          }
        }}
        open={open}
      >
        <form className="w-3/4 md:h-1/2" onSubmit={formik.handleSubmit}>
       <div className='pb-4 text-blue font-semibold text-md'>Donnez votre avis à la formation {training?.name}</div>
            <Input
            label="Adresse e-mail*"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="email"
            type="email"
            error={formik.touched.email ? formik.errors.email : ''}
            placeholder="Votre adresse e-mail"
            handleError
          />
           <Input
                  label="Avis"
                  type="text"
                  textarea
                  name="text"
                  rows={5}
                  placeholder="Donnez votre avis.."
                  value={formik.values.text}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.errors.text}
                  handleError
                />
          <Button
            // disabled={addPart?.loading}
            className="w-1/2 m-auto bg-green hover:bg-blue-600 w-full text-white font-medium text-lg mt-4 hover:text-black"
          >
            Ajouter
          </Button>
          <div className='text-red pt-2'>{msgError}</div>
        </form>
      </Modal>
    </>
  );
};

export default ModalReview;
