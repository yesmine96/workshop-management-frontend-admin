import { useState, useEffect } from 'react';
import { Redirect, Switch } from 'react-router-dom';
import PreviousMenuContext from 'contexts/PreviousMenuState';
import { MenuStatesValues } from 'contexts/MenuContext';
import UserContext from 'contexts/UserContext';
import Route from 'components/ui/Route/Route';
import { User } from 'requests/types';
import startup from 'utils/startup';

import CardIdContext from 'contexts/CardIdContext';
import ProtectedRoute from 'components/ui/Route/ProtectedRoute';
import DashboardAdmin from './DashboardAdmin/DashboardAdmin';

import HomeContainer from './Home/HomeContainer';
import LoginContainer from './Login/LoginContainer';
import DetailsContainer from './DetailsTraining/DeatilsTraining';
import NotFoundContainer from './NotFoundConatiner/NotFoundConatiner';


const RootContainer = () => {
  const [user, setUser] = useState(null as User | null);
  const [startupEnded, setStartupEnded] = useState(false);
  const [cardId, setCardId] = useState<string | any>('');
  const [PreviousStates, setPreviousStates] = useState<MenuStatesValues | any>(MenuStatesValues.mainMenu);
  useEffect(() => {
    startup().then((u) => {
      setUser(u);
      setStartupEnded(true);
    });
  }, []);

  if (!startupEnded) return <div />;

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <PreviousMenuContext.Provider value={{ PreviousStates, setPreviousStates }}>
        <CardIdContext.Provider value={{ cardId, setCardId }}>
          <Switch>
            <ProtectedRoute footer={false} header={false} path="/admin"  component={DashboardAdmin} />
    
            <Route path="/"  footer={false}  exact  component={HomeContainer} />
       
            {/* Page Questionnaire
        Page Questionnaire Partie Final */}
            <Route path="/training/:id" exact  component={DetailsContainer} />
            <Route footer={false} header={false} path="/login" exact component={LoginContainer} />
            <Route path="/404" component={NotFoundContainer} />
            <Redirect from="*" to="/404" />
          </Switch>
        </CardIdContext.Provider>
      </PreviousMenuContext.Provider>
    </UserContext.Provider>
  );
};

export default RootContainer;
