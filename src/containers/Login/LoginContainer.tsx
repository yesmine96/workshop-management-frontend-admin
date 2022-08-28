import logo from 'assets/png/logo.png';
import LogoBeeClick from 'components/icons/LogoBeeClick';
import Button from 'components/ux/Button';
import CheckBox from 'components/ux/CheckBox';
import Input from 'components/ux/Input';
import UserContext from 'contexts/UserContext';
import { useFormik } from 'formik';
import useAuth from 'hooks/useAuth';
import { useContext, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import sdcLogo from 'assets/png/logo/sdsLogo.png';
import { useLogin } from 'requests/Auth/auth';
import * as yup from 'yup';
const LoginContainer = () => {
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
      username: '',
      password: '',
    },
    validationSchema: yup.object({
      username: yup.string().required('Username is required'),
      password: yup.string().required('Password is required'),
    }),
    onSubmit: async (values) => {
      const { errors, data }: any = await loginCall({
        variables: { ...values, recordarUsuario: stayConnected },
      });
      if (errors) toast.error(errors.message);
      else toast.success('Welcome ' + data?.login?.user?.user_name);
    },
  });

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="flex justify-start h-full">
      <div className="sidebar w-[596px] px-[85px] py-[70px] bg-[#FAE2D3] ">
        <img alt="sidebar_mig" src={logo} className="pb-[3.5rem] h-[120px]" />
        <div className="flex flex-col justify-between gap-8">
          <p className="text-[#E56E1B] text-xl font-semibold">Vous êtes un nouvel utilisateur ?</p>
          <p className="font-normal">Inscrivez vous ! C'est simple et gratuit</p>
          <p className="font-normal">
            En créant votre compte client sur notre plateforme, vous pourrez plus facilement passer vos commandes en
            ligne, consulter votre historique de commandes et accéder gratuitement à nos services personnalisés : gérez
            vos envois, retours et contre remboursements, …
          </p>
          <p className="font-normal">Vous recevrez vos identifiants par email sous 24h.</p>
          <Button
            onClick={() => history.push('/register')}
            size="sm"
            className="!w-[150px] cursor-pointer text-base rounded-[8px] border-l-2	px-0 h-50 text-blue  bg-[#000000] text-white"
          >
            Inscription
          </Button>

          <div className="flex justify-center">
            <img alt="sidebar_mig" src={sdcLogo} className="pt-[15px]" />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center flex-1 ">
        <div className="login-section flex flex-col gap-12 min-w-[500px] ">
          <div className="flex flex-col gap-4 justify-center items-center">
            <LogoBeeClick />
            <div className="text-center">
              <p className="text-xl font-medium">Connexion</p>
              <p>Lorem ipsum dolor sit amet</p>
            </div>
          </div>
          <form className="flex items-center flex-col justify-center gap-16 " onSubmit={handleSubmit}>
            <div className="w-full flex flex-col gap-3">
              <Input
                errorClassName="text-[#FF4040]"
                labelClassName="font-semibold"
                label="Adresse email"
                className="border-none"
                value={username}
                error={errors.username}
                onChange={handleChange('username')}
                placeholder="Tapez votre adresse email"
              />
              <Input
                errorClassName="text-[#FF4040]"
                labelClassName="font-semibold"
                label="Mot de passe"
                className="border-none"
                value={password}
                error={errors.password}
                onChange={handleChange('password')}
                placeholder="password"
                type="password"
              />
              <CheckBox
                labelclassName="text-[#818181] text-sm"
                onChecked={(v) => setstayConnected(v)}
                label="Se souvenir de moi"
              />
            </div>
            <Button
              size="none"
              className="bg-[#E56E1B] text-sm hover:bg-[#E56E1B7d] font-bold text-white rounded-xl px-4 py-3"
            >
              Se connecter
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginContainer;
