import { useEffect, useState } from 'react';

import { useFormik } from 'formik';
// import router, { useRouter } from 'next/router';
import * as Yup from 'yup';
import { ref } from 'yup';

import Button from 'components/ux/Button';
import Password from 'components/icons/Password';
import Input from 'components/ux/Input';
// import useSnackBar from 'hooks/useSnackBar';

import { useResetPassword, useUpdate, useVerifToken } from 'requests/Auth/auth';
import { toast } from 'react-toastify';

const FormSection = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmepassword: '',
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email('Votre adresse e-mail doit être valide (exemple@domain.com)')
        .required('Veuillez saisir votre adresse e-mail'),
      password: Yup.string().required('Veuillez saisir le nouveau mot de passe'),
      confirmepassword: Yup.string()
        .oneOf([ref('password')], 'Le nouveau mot de passe et le mot de passe de confirmation ne correspondent pas')

        .required('Veuillez confirmer le mot de passe'),
    }),
    onSubmit: () => {
      // console.log({ values });
    },
  });

  // const { query, push } = useRouter();
  const [verifToken] = useVerifToken();
  const [user, setuser] = useState<{ id: string; fullName: string }>();
  const [updateUser] = useUpdate({ fetchPolicy: 'no-cache' });
  // const { showSnackBar } = useSnackBar();
  const [expired, setexpired] = useState(false);
  const [resetPassword] = useResetPassword();

  const renewPassword = () => {
    updateUser({
      variables: { id: '6342a6721cbd9f456e08ce20', password: formik.values.password },
    }).then(({ data }) => {
      toast.success('Le mot de passe a été changé avec succès');
    });
  };

  // useEffect(() => {
  //   if (query.t) {
  //     const token: any = query.t!;
  //     if (token) {
  //       verifToken({ variables: { token } }).then(({ data }) => {
  //         if (data?.verifToken?.id) {
  //           setuser(data?.verifToken);
  //         } else {
  //           setexpired(true);
  //           showSnackBar({ content: 'Session Expirée', type: 'error' });
  //         }
  //       });
  //     }
  //   }
  // }, [query]);

  return (
    <form onSubmit={formik?.handleSubmit}>
      <div className=" w-full h-screen m-auto flex flex-col justify-center items-center -ml-10 ">
        <p className="w-auto text-34 font-CalibreSemiBold">Bonjour Yesmine {user?.fullName}</p>
        <div className="flex flex-col justify-center items-center min-h-290 w-[500px] 2xl-w-[300px] gap-y-6">
          {expired && (
            <div className="text-blue text-30 font-CalibreSemiBold mb-16  lg:text-3xl	md:text-22">
              Votre lien n'est plus valide
            </div>
          )}
          {!expired && (
            <>
              <div className="text-blue text-[44px] text-[30px] font-CalibreSemiBold mb-16  lg:text-3xl	md:text-22">
                Changer le mot de passe
              </div>
              <Input
                placeholder="Nouveau mot de passe"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="password"
                type="password"
                error={formik.touched.password ? formik.errors.password : ''}
                iconLeft={<Password width="15px" fill="#0B0329" />}
                handleError
              />
              <Input
                placeholder="Confirmez le nouveau mot de passe"
                value={formik.values.confirmepassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="confirmepassword"
                type="password"
                error={formik.touched.confirmepassword ? formik.errors.confirmepassword : ''}
                iconLeft={<Password width="15px" fill="#0B0329" />}
                handleError
              />
            </>
          )}
          <Button
            onClick={() => {
              renewPassword();
              if (expired) {
                // const token: any = query.t!;
                // resetPassword({ variables: { token } }).then(() => {
                //   // showSnackBar({ content: 'Verifier Votre Email', type: 'success' });
                //   // push('/login');
                // });
              } else {
                renewPassword();
              }
            }}
            className="  rounded-xl text-26 lg:text-22 text-white font-CalibreSemiBold bg-[#00458b]  lg:mt-0 w-full md:h-12 md:text-lg"
          >
            {' '}
            {expired ? `Renvoyer l'email` : 'Confirmer'}
          </Button>
        </div>
      </div>
    </form>
  );
};
export default FormSection;
