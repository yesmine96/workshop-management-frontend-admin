/* eslint-disable no-nested-ternary */
import logo from 'assets/svg/logoAlizeWhite.svg';
import Button from 'components/Button';
import Cancel from 'components/icons/Cancel';
// import { Sponsor } from 'components/ux/sponsor';
// import useAuth from 'hooks/useAuth';
import LoginIcon from 'components/icons/LoginIcon';
import Plus from 'components/icons/Plus';
import Snackbar from 'components/ui/Snackbar/Snackbar';
import DeleteModal from 'components/ux/DeleteModal';
import Input from 'components/ux/Input';
import Pagination from 'components/ux/Pagination';
import UserContext from 'contexts/UserContext';
import localforage from 'localforage';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDeleteUser, useLogout, UsersData } from 'requests/auth';
import { User } from 'requests/types';
// import MenuIcon from 'components/icons/MenuIcon';
import { Spinner } from 'utils/loading';
import { decodeUri, encodeUri } from 'utils/url';
import UserLine from './UserLine';

interface Props {
  menuOpen: boolean;
  setmenuOpen: (v: boolean) => void;
  allusers: { users: UsersData } | undefined;
  loading: boolean;
  refetch: () => void;
  PerPage: number;
  search: string | undefined;
  setsearch: (v: string | undefined) => void;
  setuserToUpdate: (v: User | undefined) => void | undefined;
}

export default function ListUsers({
  menuOpen,
  setmenuOpen,
  loading,
  allusers,
  refetch,
  PerPage,
  search,
  setsearch,
  setuserToUpdate,
}: Props) {
  const history = useHistory();
  const location = useLocation();
  const { setUser } = useContext(UserContext);

  const uri = decodeUri(location.search);
  const [logoutCall, { data: logoutData }] = useLogout();

  useEffect(() => {
    if (logoutData) {
      setUser(null);
      localforage.clear();
    }
  }, [logoutData]);
  const [, { data }] = useDeleteUser();
  const [notif, setnotif] = useState(false);
  const [deletemodal, setdeletemodal] = useState(false);
  const [userIDtoDelete, setuserIDtoDelete] = useState('');

  function onPageChange(nextPage: number) {
    history.replace({ pathname: location.pathname, search: encodeUri({ ...uri, page: nextPage }) });
    window.scroll({ top: 0 });
  }
  function returnPageOne() {
    history.replace({ pathname: location.pathname, search: encodeUri({ ...uri, page: 1 }) });
    window.scroll({ top: 0 });
  }
  const {
    data: daata,
    count,
    totalPages = 10,
  } = useMemo(
    () =>
      allusers?.users
        ? {
            data: allusers?.users.data,
            count: allusers?.users.count,
            page: allusers?.users.page,
            totalPages:
              Math.floor(allusers?.users.count / PerPage) <= 0
                ? Math.floor(allusers?.users.count / PerPage + 1)
                : Math.floor(allusers?.users.count / PerPage),
          }
        : { data: [] },
    [allusers?.users],
  );

  useEffect(() => {
    if (data?.removeUser === 'deleted') {
      setnotif(true);
      setTimeout(() => {
        setnotif(false);
      }, 3000);
    }
  }, [data?.removeUser]);

  useEffect(() => {
    if (parseInt(uri.page, 10) !== 1) {
      returnPageOne();
    }
  }, [search]);

  const [orderAjout, setorderAjout] = useState({ order: false, field: 'createdAt' });
  const chooseSort = (field: string, order: boolean) =>
    ['createdAt', 'last_login'].includes(field)
      ? order
        ? (a: any, b: any) => new Date(parseInt(a[field], 10)).valueOf() - new Date(parseInt(b[field], 10)).valueOf()
        : (b: any, a: any) => new Date(parseInt(a[field], 10)).valueOf() - new Date(parseInt(b[field], 10)).valueOf()
      : ['firstName', 'email', 'id'].includes(field)
      ? order
        ? (a: any, b: any) => a[field].localeCompare(b[field], 'en', { sensitivity: 'base' })
        : (b: any, a: any) => a[field].localeCompare(b[field], 'en', { sensitivity: 'base' })
      : (a: any, b: any) => a[field]?.localeCompare(b[field], 'en', { sensitivity: 'base' });

  return (
    <div
      className="w-full px-24  lg:px-10  sm:px-5  bg-gray-100 text-gray-900 tracking-wider leading-normal z-50"
      style={menuOpen ? { marginLeft: '-500px', transition: '0.7s' } : { transition: '0.7s' }}
    >
      {' '}
      <div className=" w-full overscroll-x-none  mx-auto ">
        <div className="flex  items-center justify-between">
          <div className="flex items-center  font-sans font-bold break-normal text-2xl text-blue-500 gap-2">
            <img className="cursor-pointer p-2 h-20" src={logo} alt="" />
            <div>
              Dashboard Admin <br />
              <span>
                {' '}
                <p className="flex items-center font-sans font-bold break-normal text-blue-500  text-xs ">
                  <Link className="underline cursor-pointer mx-2" to="/">
                    retourner au site
                  </Link>{' '}
                  <LoginIcon fill="#111136" width="25px" className="h-8 lg:h-4" />
                </p>
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={() => setmenuOpen(!menuOpen)} className="" variant="primary" size="md">
              <div className="flex items-center justify-center gap-5 w-full">
                <div className="w-6">
                  <Plus width={24} />
                </div>
                <div className="w-28 text-sm min-w-max md:hidden "> Ajouter utlisateur</div>
              </div>
            </Button>
            <a
              onClick={(ee) => {
                ee.preventDefault();
                logoutCall();
              }}
              href="/"
              className="px-4 py-1 text-sm text-white bg-red-400 rounded flex items-center hover:bg-red"
            >
              Déconnexion
            </a>
          </div>
        </div>
        <p className="font-semibold  flex items-center gap-2 mb-2 ">
          Rechercher :{' '}
          {count && (
            <span className="p-0 h-4  rounded-full text-sm ">
              (<span className="text-yellow font-bold ">{count}</span> résultat{count > 1 && <span>s</span>})
            </span>
          )}
        </p>
        <Input
          style={{ border: '1px solid rgb(17 16 54 / 15%)' }}
          value={search}
          onChange={(e) => setsearch(e.target.value)}
          iconRight={
            <Cancel
              width={24}
              onClick={() => {
                setsearch('');
              }}
            />
          }
        />
        <div className="esdsd block p-0">
          <Pagination
            currentPage={parseInt(uri.page, 10) ? parseInt(uri.page, 10) : 1}
            onPageChange={onPageChange}
            totalPages={totalPages}
          />
        </div>
        <div id="recipients" className="p-1 px-2 mt-1 lg:mt-0 rounded shadow bg-white h-auto overflow-y-auto">
          {!loading ? (
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    className="px-6 py-2 text-xs text-gray-500 hover:bg-gray-100  cursor-pointer"
                    onClick={() => {
                      setorderAjout((old) => ({ order: !old.order, field: 'id' }));
                    }}
                  >
                    ID
                  </th>
                  <th
                    className="px-6 py-2 text-xs text-gray-500 hover:bg-gray-100  cursor-pointer"
                    onClick={() => {
                      setorderAjout((old) => ({ order: !old.order, field: 'firstName' }));
                    }}
                  >
                    Name
                  </th>
                  <th
                    className="px-6 py-2 text-xs text-gray-500  hover:bg-gray-100  cursor-pointer"
                    onClick={() => {
                      setorderAjout((old) => ({ order: !old.order, field: 'createdAt' }));
                    }}
                  >
                    Date d'ajout
                  </th>
                  <th
                    className="px-6 py-2 text-xs text-gray-500 hover:bg-gray-100  cursor-pointer"
                    onClick={() => {
                      setorderAjout((old) => ({ order: !old.order, field: 'email' }));
                    }}
                  >
                    Email
                  </th>
                  <th
                    className="px-6 py-2 text-xs text-gray-500 hover:bg-gray-100  cursor-pointer"
                    onClick={() => {
                      setorderAjout((old) => ({ order: !old.order, field: 'last_login' }));
                    }}
                  >
                    Derniere Connexion
                  </th>
                  <th className="px-6 py-2 text-xs text-gray-500">Status</th>
                  <th className="px-6 py-2 text-xs text-gray-500">Delete</th>
                </tr>
              </thead>
              <tbody className="bg-white text-center divide-y divide-gray-300">
                {daata
                  .filter((ee) => (search?.length ? ee.email.includes(search) : true))
                  .sort(chooseSort(orderAjout.field, orderAjout.order))
                  .map((e) => (
                    <UserLine
                      setmenuOpen={setmenuOpen}
                      setuserToUpdate={setuserToUpdate}
                      refetch={refetch}
                      search={search}
                      e={e}
                      setuserIDtoDelete={setuserIDtoDelete}
                      setdeletemodal={setdeletemodal}
                    />
                  ))}
              </tbody>
            </table>
          ) : (
            <div className="absolute top-1/3 right-1/2">
              <Spinner name="line-scale-pulse-out-rapid" color="#1466ff" />
            </div>
          )}
        </div>
      </div>
      {false && (
        <div className="esdsd block p-2">
          <Pagination
            currentPage={parseInt(uri.page, 10) ? parseInt(uri.page, 10) : 1}
            onPageChange={onPageChange}
            totalPages={totalPages}
          />
        </div>
      )}
      <Snackbar onClose={() => setnotif(false)} message="Utilisateur supprimé" open={notif} />
      <DeleteModal
        deleteCall={useDeleteUser}
        id={deletemodal ? userIDtoDelete : ''}
        msg="Voulez-vous vraiment supprimer cet utilisateur &nbsp;?"
        confirmationMsg="Cet utilisateur a été supprimé de la liste"
        onClose={(updated: boolean) => {
          if (updated) {
            refetch();
            setdeletemodal(false);
          }
        }}
      />
    </div>
  );
}
