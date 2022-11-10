import React, { useEffect, useState } from 'react';
import Snackbar from 'components/ui/Snackbar/Snackbar';
import Input from 'components/ux/Input';
import LoginIcon from 'components/icons/LoginIcon';
import Button from 'components/Button';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { useRegister, useUpdateUser } from 'requests/auth';
import * as yup from 'yup';
import Close from 'components/icons/Close';
import classNames from 'utils/classNames';
import CheckBox from 'components/filtres/Checkbox/Checkbox2';
import { User } from 'requests/types';
import bcrypt from 'bcryptjs';

export default function UsersPanel({
  menuOpen,
  refetch,
  setmenuOpen,
  userToUpdate,
  setuserToUpdate,
}: {
  menuOpen: boolean;
  setmenuOpen: (v: boolean) => void;
  refetch: () => void;
  userToUpdate: User | undefined;
  setuserToUpdate: (v: User | undefined) => void | undefined;
}) {
  const [register, { data, error }] = useRegister();
  const [toaster, settoaster] = useState(false);
  const [toaster2, settoaster2] = useState(false);
  const [updateUser, { data: data2, error: errorUpdate }] = useUpdateUser();
  const [defaultpassword, setdefaultpassword] = useState(true);
  const [actualpassword, setactualpassword] = useState(true);
  const [defaultUser, setdefaultUser] = useState<any>();

  useEffect(() => {
    setdefaultUser(userToUpdate);
  }, [userToUpdate]);
  const formik = useFormik({
    initialValues: {
      email: defaultUser?.email || '',
      password: 'SPLF2022',
      lastName: defaultUser?.lastName || '',
      firstName: defaultUser?.firstName || '',
    },
    enableReinitialize: true,

    validationSchema: yup.object({
      email: yup
        .string()
        .email('Votre adresse e-mail doit être valide (exemple@domain.com)')
        .required('Veuillez renseigner votre adresse e-mail'),
      password: yup.string().required('Veuillez renseigner votre mot de passe'),
      lastName: yup.string().required('Veuillez renseigner le prénom'),
      firstName: yup.string().required('Veuillez renseigner le mot nom'),
    }),
    onSubmit: async (values) => {
      if (userToUpdate) {
        updateUser({
          variables: {
            id: userToUpdate?.id,
            ...values,
            // eslint-disable-next-line no-nested-ternary
            password: actualpassword
              ? userToUpdate.password!
              : defaultpassword
              ? await bcrypt.hash('SPLF2022', 10)
              : await bcrypt.hash(values.password, 10),
          },
        }).then(() => {
          refetch();
        });
      } else {
        register({
          variables: { ...values, password: defaultpassword ? 'DEFAULT' : values.password },
        }).then(() => {
          refetch();
        });
      }
    },
  });

  useEffect(() => {
    if (data?.register.user.id) {
      settoaster(true);
      formik.resetForm();
      setTimeout(() => {
        settoaster(false);
        setmenuOpen(false);
      }, 3000);
    }
  }, [data?.register.user.id]);

  useEffect(() => {
    if (error?.message) {
      settoaster(true);
      setTimeout(() => {
        settoaster(false);
      }, 3000);
    }
  }, [error]);

  useEffect(() => {
    if (data2?.updateUserData.id) {
      settoaster2(true);
      formik.resetForm();
      setuserToUpdate(undefined);
      setTimeout(() => {
        settoaster2(false);
        setmenuOpen(false);
        setuserToUpdate(undefined);
      }, 1000);
    }
  }, [data2?.updateUserData.id]);

  useEffect(() => {
    if (errorUpdate?.message) {
      settoaster2(true);
      setTimeout(() => {
        settoaster2(false);
      }, 1000);
    }
  }, [errorUpdate]);

  return (
    <div
      className="flex  flex-col overscroll-x-none  items-center justify-center h-screen  bg-green w-168 "
      style={menuOpen ? { width: '500px', transition: '0.7s' } : { width: '0', transition: '0.7s' }}
    >
      <Close
        className={classNames(
          `${!menuOpen && 'hidden'}`,
          'absolute top-8 right-9 cursor-pointer  bg-teal-400 ',
          'ease-linear transform hover:scale-125 transition duration-500 z-50',
        )}
        fill="white"
        height={24}
        onClick={() => setmenuOpen(false)}
      />
      <div className="flex flex-col  justify-center mt-4 sm:mt-8 w-full px-4	">
        <div className="  font-semibold text-32	 2xl:mt-0 lg:mt-2 text-white">
          {userToUpdate ? 'Interface de mis a jour' : 'Interface Ajout'}{' '}
        </div>
        <form onSubmit={formik.handleSubmit}>
          <Input
            label="Identifiant"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="email"
            name="email"
            placeholder="Adresse email"
            iconRight={<LoginIcon fill="#111136" width="25px" className="h-8 lg:h-4" />}
            errorColor="red"
          />

          <div className="flex gap-3">
            <Input
              label="Nom"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="lastName"
              name="lastName"
              placeholder="Nom"
              errorColor="red"
            />

            <Input
              label="Prénom"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="firstName"
              name="firstName"
              placeholder="Prénom"
              errorColor="red"
            />
          </div>
          {userToUpdate ? (
            <>
              <div className="flex">
                <div className=" min-w-max mr-4 text-white text-md font-regular mb-2.5 md:text-sm">Mot de passe</div>
                <CheckBox
                  label="Actuel"
                  checked={Boolean(actualpassword)}
                  onChange={() => setactualpassword(!actualpassword)}
                />
              </div>
              {!actualpassword && (
                <div className="flex">
                  <div className=" min-w-max mr-4 text-white text-md font-regular mb-2.5 md:text-sm">Mot de passe</div>
                  <CheckBox
                    label="Par défaut"
                    checked={Boolean(defaultpassword)}
                    onChange={() => setdefaultpassword(!defaultpassword)}
                  />
                  <p className="text-white ">(SPLF2022)</p>
                </div>
              )}
              <div className="flex items-center gap-3">
                {!defaultpassword && (
                  <Input
                    disabled={defaultpassword}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Mot de passe"
                    error={formik.touched.password ? formik.errors.password : ''}
                    errorColor="yellow"
                  />
                )}
              </div>
            </>
          ) : (
            <>
              <div className="flex">
                <div className=" min-w-max mr-4 text-white text-md font-regular mb-2.5 md:text-sm">Mot de passe</div>
                <CheckBox
                  label="Par défaut"
                  checked={Boolean(defaultpassword)}
                  onChange={() => setdefaultpassword(!defaultpassword)}
                />
                <p className="text-white ">(SPLF2022)</p>
              </div>
              <div className="flex items-center gap-3">
                {!defaultpassword && (
                  <Input
                    disabled={defaultpassword}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Mot de passe"
                    error={formik.touched.password ? formik.errors.password : ''}
                    errorColor="yellow"
                  />
                )}
              </div>
            </>
          )}

          <div className="text-center 2xl:mt-4 mt-6">
            <Button
              variant="octoExtraordinary"
              className="w-full mb-30 2xl:mb-2 lg:mb-5 h-16 py-1.5 rounded-5 text-26 "
            >
              {userToUpdate ? 'Mettre a jour Utilisateur' : 'Ajouter utilisateur'}
            </Button>
            <Link className="text-grey-300 text-lg underline 	 cursor-pointer" to="/">
              Voir site
            </Link>
          </div>
        </form>
      </div>

      <Snackbar
        onClose={() => settoaster(false)}
        message={error?.message ? error?.message : 'Utilisateur ajouté'}
        open={Boolean(toaster)}
      />
      <Snackbar
        onClose={() => settoaster(false)}
        message={errorUpdate?.message ? errorUpdate?.message : 'Utilisateur mis a jour'}
        open={Boolean(toaster2)}
      />
    </div>
  );
}
