import { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';

import UserContext from 'contexts/UserContext';
import cardIdContext from 'contexts/CardIdContext';

import Input from 'components/ux/Input';
import Button from 'components/Button';
import TitleLogo from 'components/ux/TitleLogo';
import { Sponsor } from 'components/ux/sponsor';
import useAuth from 'hooks/useAuth';
import { useLogin } from 'requests/auth';
import LoginIcon from 'components/icons/LoginIcon';

import logoAlize from 'assets/svg/logoAlizeWhite.svg';
import useSnackbarState from 'hooks/useSnackbarState';
import Snackbar from 'components/ui/Snackbar/Snackbar';

const LoginContainer = () => {
  const [loginCall, loginState] = useAuth(useLogin);
  const snackbarState = useSnackbarState(loginState);
  const { setCardId } = useContext(cardIdContext);
  const { user } = useContext(UserContext);
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email('Votre adresse e-mail doit être valide (exemple@domain.com)')
        .required('Veuillez renseigner votre adresse e-mail'),
      password: yup.string().required('Veuillez renseigner votre mot de passe'),
    }),
    onSubmit: (values) => {
      loginCall({
        variables: values,
      });
      setCardId('');
    },
  });

  if (user) {
    return user.role === 'admin' ? <Redirect to="/admin" /> : <Redirect to="/" />;
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-center h-screen w-full bg-grey-100">
      <div className="flex flex-col flex-1 justify-center mt-4 sm:mt-8 w-536 2xl:w-420 xl:w-5/6 md:w-342 lg:w-3/5	">
        <TitleLogo logo={logoAlize} subtitle="Ce site est réservé aux professionnels de santé" />
        <form onSubmit={formik.handleSubmit}>
          <Input
            label="Identifiant"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="email"
            name="email"
            error={formik.touched.email ? formik.errors.email : ''}
            placeholder="Adresse email"
            iconRight={<LoginIcon fill="#111136" width="25px" className="h-8 lg:h-4" />}
            errorColor="red-250"
          />

          <Input
            label="Mot de passe"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="password"
            name="password"
            type="password"
            placeholder="Mot de passe"
            error={formik.touched.password ? formik.errors.password : ''}
            errorColor="red-250"
          />

          <div className="text-center 2xl:mt-4 mt-6">
            <Button
              variant="secondary"
              className="w-full mb-30 2xl:mb-2 lg:mb-5 h-16 py-1.5 rounded-5 hover:bg-green hover:text-white	2xl:h-14 3xl:text-xl sm:text-base 2xl:text-lg  "
            >
              Se connecter
            </Button>
            <a
              className="text-green text-base underline 2xl:text-xs	 cursor-pointer"
              href="mailto:webmaster@splf.org?subject=Demande de code d'accès - Guide Alizé Web"
            >
              Obtenir un code d'accès
            </a>
          </div>
        </form>
      </div>
      <circle cx="60" cy="60" r="50" />
      <div className="flex justify-center w-full items-center lg:mt-12 mb-10 2xl:mt-8 2xl:mb-4 xl:mb-10">
        <Sponsor />
      </div>
      <Snackbar {...snackbarState} />
    </div>
  );
};

export default LoginContainer;
