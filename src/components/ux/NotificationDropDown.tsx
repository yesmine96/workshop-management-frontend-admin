import Notification from 'components/icons/Notification';
import moment from 'moment';
import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import DropDown from './DropDown';

export default function NotificationDropDown() {
  const [open, setOpen] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);
  const history = useHistory();

  const Notifs = [
    {
      status: 'en_cours',
      value: 'Répondu par CRM USER ',
      title: 'Réponse Ticket N1194',
      time: Date.now(),
    },
    {
      status: 'livre',
      value: 'Livrée avec success',
      title: 'Colis #57485832472',
      time: Date.now(),
    },
    {
      status: 'en_cours',
      value: 'Equipe Beeclik en route pour prendre vos colis',
      title: 'En cours d’enlevement',
      time: Date.now(),
    },
    {
      status: 'retour',
      value: 'Colis #57485832472 est tournée vers vous (Client ne répond pas)',
      title: 'Retour',
      time: Date.now(),
    },
    {
      status: 'en_cours',
      value: 'N OP: 57485832472',
      title: 'Nouvelle payment de la part de beeclik',
      time: Date.now(),
    },
  ];

  const statusColors: Record<string, string> = {
    en_cours: 'bg-[#E56E1B]',
    livre: 'bg-[#00C781]',
    retour: 'bg-[#FF4040]',
  };

  return (
    <div className="relative">
      <div
        onClick={() => {
          setOpen(true);
        }}
      >
        <Notification news={true} />
      </div>

      <DropDown
        anchorEl={divRef}
        open={open}
        onClose={() => setOpen(false)}
        className="rounded-3 w-[200px]"
        left={-320}
        top={40}
      >
        <div className="min-w-[350px] flex flex-col gap-4 bg-[#FFFFFF] shadow-dropdown_2 py-3 px-[20px] rounded-xl">
          <div className="  ">
            <p className="font-semibold text-base text-[black]">Notifications</p>
          </div>

          {Notifs.map(({ status, title, value, time }) => (
            <div
              onClick={() => history.push('/gestionprofil')}
              className=" cursor-pointer hover:text-gray flex items-center justify-center gap-[17px] border-t-[1px]
            border-[#D9D9D9] py-2"
            >
              <div className="flex items-end justify-self-start">
                <div className={`h-2 w-2 rounded-full ${statusColors[status]}`} />
              </div>
              <div className="flex flex-col">
                <p className="text-sm">
                  <b>{title}:</b> {value}{' '}
                </p>
                <p className="text-[#818181] text-xs">{moment(time).startOf('hours').fromNow()}</p>
              </div>
            </div>
          ))}
        </div>
      </DropDown>
    </div>
  );
}
