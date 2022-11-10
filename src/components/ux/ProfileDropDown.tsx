import ArrowDown from 'components/icons/ArrowDown';
import Logout from 'components/icons/Logout';
import SettingIcon from 'components/icons/SettingIcon';
import UserContext from 'contexts/UserContext';
import localforage from 'localforage';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useLogout } from 'requests/Auth/auth';
import DropDown from './DropDown';

export default function ProfileDropDown() {
  const [open, setOpen] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);
  const { setUser } = useContext(UserContext);
  const history = useHistory();
  const [logoutCall, { data: logoutData }] = useLogout();

  useEffect(() => {
    if (logoutData) {
      setUser(null);
      localforage.clear();
      history.push('/login');
    }
  }, [logoutData, logoutCall]); // eslint-disable-line

  return (
    <div className="relative">
      <div
        className="bg-[#FAFAFA] hover:text-gray gap-3 cursor-pointer  shadow-dropdown min-w-[68px] min-h-[45px] rounded-lg flex items-center justify-center "
        onClick={() => setOpen(!open)}
        ref={divRef}
      >
        <p className="text-xl">Y</p>
        <ArrowDown />
      </div>

      <DropDown
        anchorEl={divRef}
        open={open}
        onClose={() => setOpen(false)}
        className="rounded-3 w-[200px]"
        left={-130}
        top={50}
      >
        <div className="min-w-[200px] flex flex-col gap-4 bg-[#FFFFFF] shadow-dropdown_2 p-[32px] rounded-xl">
          <div>
            <p className="font-semibold text-base">Yesmine Ghorbel</p>
          </div>
          <div
            onClick={() => history.push('/gestionprofil')}
            className=" cursor-pointer hover:text-gray flex items-center gap-[17px]"
          >
            <SettingIcon />
            <p className="text-sm">Profil</p>
          </div>

          <div
            onClick={() => {
              logoutCall();
            }}
            className="cursor-pointer hover:text-gray  flex items-center gap-[17px]"
          >
            <Logout width={16} height={16} />
            <p className="text-sm">Se déconnecter</p>
          </div>
        </div>
      </DropDown>
    </div>
  );
}
