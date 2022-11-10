import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useUsers } from 'requests/auth';
import { User } from 'requests/types';
import { decodeUri } from 'utils/url';
import ListUsers from './ListUsers';
import UsersPanel from './UsersPanel';

const DashboardAdmin = () => {
  const [menuOpen, setmenuOpen] = useState(false);
  const PerPage = 50;
  const location = useLocation();
  const [search, setsearch] = useState<string>();
  const [userToUpdate, setuserToUpdate] = useState<User>();

  const uri = decodeUri(location.search);
  const {
    data: allusers,
    loading,
    refetch,
  } = useUsers({
    variables: { perPage: PerPage, page: uri.page ? Number(uri.page) : 1, search },
    fetchPolicy: 'network-only',
  });
  return (
    <div className="flex overflow-x-hidden">
      <ListUsers
        search={search}
        setsearch={setsearch}
        PerPage={PerPage}
        refetch={refetch}
        allusers={allusers}
        loading={loading}
        menuOpen={menuOpen}
        setmenuOpen={setmenuOpen}
        setuserToUpdate={setuserToUpdate}
      />
      <UsersPanel
        setuserToUpdate={setuserToUpdate}
        userToUpdate={userToUpdate}
        setmenuOpen={setmenuOpen}
        refetch={refetch}
        menuOpen={menuOpen}
      />
    </div>
  );
};

export default DashboardAdmin;
