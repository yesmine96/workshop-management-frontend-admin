import Route from 'components/ui/Route/Route';
import Register from 'containers/Register/Register';
import UserContext from 'contexts/UserContext';
import { useEffect, useState } from 'react';
import { Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { User } from 'requests/Auth/types';
import Trainer from './Trainer';

import HomeContainer from './Home';
import LoginContainer from './Login/LoginContainer';
import AddTraining from './Training/AddTraining';
import Training from './Training/Training';
import DetailsTraining from './Training/DetailsTraining';

const RootContainer = () => {
  const [user, setUser] = useState(null as User | null);

  useEffect(() => {}, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <ToastContainer />
      <Switch>
        <Route header={false} protected path="/register" exact component={Register} />
        <Route path="/" exact component={HomeContainer} />
        <Route path="/Trainer" exact component={Trainer} />
        <Route path="/training" exact component={Training} />
        {['/addTrainig', '/addTrainig/:id'].map((path, index) => (
          <Route path={path} component={AddTraining} exact key={index} />
        ))}

        <Route path="/DetailsTraining/:id" exact component={DetailsTraining} />

        <Route protected header={false} path="/login" exact component={LoginContainer} />
      </Switch>
    </UserContext.Provider>
  );
};

export default RootContainer;
