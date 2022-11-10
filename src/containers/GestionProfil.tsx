import logo from 'assets/png/logo.png';
import Button from 'components/ux/Button';
import CheckBox from 'components/ux/CheckBox';
import Input from 'components/ux/Input';
import UserContext from 'contexts/UserContext';
import { useFormik } from 'formik';
import useAuth from 'hooks/useAuth';
import { useContext, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import sdcLogo from 'assets/png/logo.png';
import { useLogin } from 'requests/Auth/auth';
import * as yup from 'yup';
import ModalResetPassword from 'components/Modals/ModalResetPassword';
const GestionProfil = () => {
  const { user } = useContext(UserContext);
  const [stayConnected, setstayConnected] = useState(false);
  const [loginCall] = useAuth(useLogin);
  const history = useHistory();

  const {
    values: { username, password },
    errors,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      username: 'yesmine.ghorbel96@gmail.com',
      password: '',
    },
    validationSchema: yup.object({
      username: yup.string().required('Veuillez saisir votre adresse e-mail'),

      password: yup.string().required('Veuillez saisir votre mot de passe'),
    }),
    onSubmit: async (values) => {
      const { errors, data }: any = await loginCall({
        variables: { ...values, recordarUsuario: stayConnected },
      });
      if (errors) toast.error(errors.message);
      else toast.success('Welcome ' + data?.login?.user?.user_name);
    },
  });
  const [showModal, setShowModal] = useState(false);

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="flex justify-start h-full bg-white">
      <div className="flex items-center justify-center flex-1 bg-white">
        <div className="login-section flex flex-col gap-12 min-w-[500px] ">
          <div className="flex flex-col gap-8 justify-center items-center">
            <div className="text-center">
              <p className="text-xl font-medium text-blue">Gestion de profil</p>
            </div>
          </div>
          <form className="flex items-center flex-col justify-center gap-16 " onSubmit={handleSubmit}>
            <div className="w-full flex flex-col gap-3">
              <Input
                errorClassName="text-[#FF4040]"
                labelClassName="font-semibold"
                label="Adresse e-mail *"
                className="border-none"
                value={username}
                error={errors.username}
                onChange={handleChange('username')}
                placeholder="Votre adresse e-mail"
              />
              <Input
                errorClassName="text-[#FF4040]"
                labelClassName="font-semibold"
                label="Mot de passe*"
                className="border-none"
                value={password}
                error={errors.password}
                onChange={handleChange('password')}
                placeholder="Votre mot de passe"
                type="password"
              />
              <Input
                errorClassName="text-[#FF4040]"
                labelClassName="font-semibold"
                label="Nouveau mot de passe*"
                className="border-none"
                value={password}
                error={errors.password}
                onChange={handleChange('password')}
                placeholder="Votre nouveau mot de passe"
                type="password"
              />
              <Input
                errorClassName="text-[#FF4040]"
                labelClassName="font-semibold"
                label="Confirmer nouveau mot de passe*"
                className="border-none"
                value={password}
                error={errors.password}
                onChange={handleChange('password')}
                placeholder="Confirmer nouveau mot de passe"
                type="password"
              />
            </div>
            <Button
              size="none"
              className="bg-[#00458b] text-sm hover:bg-[#E56E1B7d] font-bold text-white rounded-xl px-4 py-3"
            >
              Valider
            </Button>
            <ModalResetPassword showModal={showModal} setShowModal={setShowModal} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default GestionProfil;
