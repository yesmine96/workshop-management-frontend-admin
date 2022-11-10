import Edit from 'components/icons/Edit';
import React, { useState } from 'react';
import { useStatusUser } from 'requests/auth';
import { User } from 'requests/types';
import { dateDiff } from 'utils/groupeByFunction';

interface Props {
  search: string | undefined;
  e: User;
  setmenuOpen: (v: boolean) => void;
  setuserIDtoDelete: (id: string) => void;
  setdeletemodal: (v: boolean) => void;
  setuserToUpdate: (v: User | undefined) => void | undefined;
  refetch: () => void;
}

export default function UserLine({
  search,
  e,
  setuserIDtoDelete,
  setdeletemodal,
  setuserToUpdate,
  setmenuOpen,
  refetch,
}: Props) {
  const [updateStatus] = useStatusUser();
  const [, setloadingPlus] = useState(false);

  const date1 = new Date(e.last_login?.replace(/-/g, '/'));

  // const date2 = new Date();
  // const { sec, min, hour, day } = dateDiff(date1, date2);
  // const lastTime = `il y'a ${
  //   day > 1
  //     ? `${day} jour`
  //     : // eslint-disable-next-line
  //       `${hour >= 1 ? `${hour} heures` : min >= 1 ? `${min} minutes` : `${sec} secondes`}`
  // }  `;

  const end = new Date(parseInt(e.createdAt, 10)).getTime();
  const start = new Date().getTime();
  const { hour: hours, day: days } = dateDiff(end, start);

  const updateFunction = (state: boolean) => {
    setloadingPlus(true);
    updateStatus({ variables: { id: e.id, is_active: state ? '1' : '0' } })
      .then(() => refetch())
      .then(() => {
        setloadingPlus(false);
      });
  };
  const created = new Date(Number(e?.createdAt));

  return (
    <tr className="whitespace-nowrap">
      <td className="px-6 py-1 text-sm text-gray-500">{e.id.slice(e.id.length - 5)}</td>
      <td className="px-6 py-1">
        <div className="text-sm text-gray-900">{`${e.firstName || '...'} ${e.lastName || '...'}`}</div>
      </td>
      <td className="px-6 py-1 text-sm text-gray-500">{created.toISOString().slice(0, 10)}</td>
      <td className="px-6 py-1 flex items-center justify-center">
        <div className="text-sm text-gray-500 relative pl-3 ">
          {/* eslint-disable-next-line */}
          {e.email
            .split(search ? search : '') // eslint-disable-line
            .map((ee, i, array) => (
              <>
                {ee}
                {array.length != i + 1 ? ( // eslint-disable-line
                  <span className="text-yellow font-bold">{search ? search : null}</span> // eslint-disable-line
                ) : null}
              </>
            ))}
        </div>
        {days === 0 && hours <= 23 ? (
          <div className="ml-1 bg-red text-10 text-white font-bold  rounded-full  top-0 px-1">nouveau</div>
        ) : null}
      </td>

      <td className={`px-6 py-1  ${!e?.last_login ? 'text-red text-xs' : ' text-sm text-gray-500'}`}>
        {date1 && e.last_login ? date1?.toISOString().slice(0, 10) : '(pas encore connecté)'}
      </td>
      <td className="px-6 py-1 flex items-center justify-center text-center">
        <label className="flex items-center cursor-pointer">
          <div className="relative">
            <input
              checked={e.is_active === '1'}
              type="checkbox"
              id="check"
              className="sr-only"
              onChange={(ee) => updateFunction(ee.target.checked)}
            />
            <div className="block bg-gray-600 w-14 h-8 rounded-full" />
            <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition" />
          </div>
        </label>
      </td>
      <td className="px-6 py-1 ">
        <div className="flex ml-auto gap-2 justify-center">
          <Edit
            onClick={(ee) => {
              ee.preventDefault();
              const { id, firstName, lastName, email, role, is_active, last_login, createdAt } = e; // eslint-disable-line
              setuserToUpdate({ id, firstName, lastName, email, role, is_active, last_login, createdAt });
              setmenuOpen(true);
            }}
            className="cursor-pointer hover:text-yellow-100"
          />
          <a
            onClick={(ee) => {
              ee.preventDefault();
              setuserIDtoDelete(e.id);
              setdeletemodal(true);
            }}
            href="/"
            className="px-4 py-1 text-sm text-white bg-red-400 rounded"
          >
            supprimer
          </a>
        </div>
      </td>
    </tr>
  );
}
