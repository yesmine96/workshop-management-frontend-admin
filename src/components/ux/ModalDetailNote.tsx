import { FunctionComponent, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Input from 'components/ux/Input';
import Button from 'components/Button';
import Modal from 'components/common/Modal/Modal';
import { Note as NoteType } from 'requests/types';
import ConfirmationModal from 'components/ux/ConfirmationModal';
import { useHistory, useLocation, matchPath } from 'react-router-dom';
import {  useaddParticipation } from 'requests/trainingParticipation';

export type ModalProps = {
  open: boolean;
  onClose?: (updated: boolean) => void;
  note?: NoteType;
  training?: string;
  remove?: number;
};

const NoteModal: FunctionComponent<ModalProps> = ({ open, onClose, note }) => {
  const location = useLocation();
  const history = useHistory();
  const [msgConfirmationModal, setMsgConfirmationModal] = useState<string>('');
  const [addPart,data] = useaddParticipation();

  const formik = useFormik({
    initialValues: {
      fullName: '',
      email:"",
      telephone:""
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required('Ce champ est obligatoire'),
      email: Yup.string().required('Ce champ est obligatoire'),
      telephone: Yup.string().required('Ce champ est obligatoire'),
    }),
    onSubmit: async (values) => {
   addPart({ variables: {idTraining:"634d59cbedf56859ca40c205", clientInfo:{...values}}}).then(() => {
    setMsgConfirmationModal('Votre inscription a bien été prise en compte');
  });
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
         lg:h-full z-50 relative text-left py-24
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
       
            <Input
            label="Nom et Prénom*"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="fullName"
            error={formik.touched.fullName ? formik.errors.fullName : ''}
            placeholder="Votre nom et prénom"
            handleError
            type="text"
          />
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
            label="Numéro de Téléphone*"
            value={formik.values.telephone}
            onChange={(e) => {
              if ((e.target.value.length <= 8 && parseFloat(e.target.value) >= 0) || e.target.value === '') {
                formik.setFieldValue('telephone', e.target.value);
              }
            }}
            onBlur={formik.handleBlur}
            name="telephone"
            type="number"
            error={formik.touched.telephone ? formik.errors.telephone : ''}
            placeholder="Votre numéro de téléphone"
            handleError
          />
          <Button
            // disabled={addPart?.loading}
            className="w-1/2 m-auto bg-green hover:bg-blue-600 w-full text-white font-medium text-lg mt-4 hover:text-black"
          >
            Ajouter
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default NoteModal;
