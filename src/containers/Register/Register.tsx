import Button from 'components/ux/Button';
import UserContext from 'contexts/UserContext';
import { useContext } from 'react';
import { Redirect, useHistory } from 'react-router-dom';

const Register = () => {
  const { user } = useContext(UserContext);
  const history = useHistory();

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="flex h-full">
      <div className="sidebar w-[596px] px-[85px] py-[70px] bg-[#FAE2D3] ">
        <div className="flex flex-col justify-between gap-8">
          <p className="font-normal">Avez-vous déjà un compte ?</p>
          <Button
            onClick={() => history.push('/login')}
            size="sm"
            className="!w-[150px] hover:bg-[#E56E1B7d] cursor-pointer text-base rounded-[8px] border-l-2	px-0 h-50 text-blue  bg-[#000000] text-white"
          >
            Se connecter
          </Button>
        </div>
        <div className="flex justify-center"></div>
      </div>
      <div className="w-full flex items-center justify-center overflow-auto"></div>
    </div>
  );
};

export default Register;
