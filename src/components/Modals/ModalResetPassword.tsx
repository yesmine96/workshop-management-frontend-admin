import { useState } from 'react';

import { useFormik } from 'formik';
// import Image from 'next/image';
import * as Yup from 'yup';

import verifIcon from 'assets/svg/verification.svg';
import Button from 'components/ux/Button';
// import Letter from 'components/icons/Letter';
import Input from 'components/ux/Input';
import { useResetPassword } from 'requests/Auth/auth';

import Modal from 'components/common/Modal/Modal';

export type Props = {
  showModal: boolean;
  setShowModal: (x: boolean) => void;
};

const ModalResetPassword = ({ showModal, setShowModal }: Props) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [resetPassword] = useResetPassword();
  const formik = useFormik({
    initialValues: {
      emailModal: '',
    },
    validationSchema: Yup.object({
      emailModal: Yup.string()
        .email('Votre adresse e-mail doit être valide (exemple@domain.com)')
        .required('Veuillez saisir votre adresse e-mail'),
    }),
    onSubmit: async ({ emailModal }) => {
      if (emailModal) {
        resetPassword({ variables: { email: emailModal } }).then(({ data: response }) => {
          if (!response?.resetPassword?.id)
            formik?.setErrors({ emailModal: 'Aucun compte associé à cette adresse e-mail' });
          else {
            setShowConfirmModal(true);
            setShowModal(false);
          }
        });
      }
    },
  });

  return (
    <div>
      <Modal
        onClose={() => {
          setShowModal(false);
          formik.resetForm();
        }}
        open={showModal}
      >
        <div className="flex flex-col justify-center items-center w-10/12 py-16">
          <div className="text-lg font-CalibreMedium text-blue mb-4 ">
            Veuillez saisir votre adresse e-mail afin de recevoir le lien de réinitialisation de votre mot de passe.
          </div>
          <form onSubmit={formik.handleSubmit} className="w-full">
            <Input
              value={formik.values.emailModal}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="emailModal"
              error={formik.errors.emailModal}
              placeholder="Votre adresse e-mail"
              handleError
            />
            <Button
              className={`bg-[#00458b] mt-4 rounded-xl text-26 lg:text-22 text-white font-CalibreSemiBold bg-blue-100 mt-29 lg:mt-0 w-full md:h-12 md:text-lg `}
            >
              {' '}
              Réinitialiser
            </Button>
          </form>
        </div>
      </Modal>
      <Modal
        onClose={() => {
          setShowConfirmModal(false);
          formik.resetForm();
        }}
        open={showConfirmModal}
      >
        <div className="flex-col flex justify-center items-center w-10/12 gap-y-2 p-20">
          <div className="text-blue font-CalibreSemiBold text-34 text-center lg:text-20 md:text-base md:mb-21 lg:mb-26">
            {' '}
            Nous avons envoyé par e-mail le lien de réinitialisation du mot de passe
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default ModalResetPassword;
