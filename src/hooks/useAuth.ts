import { MutationHookOptions, MutationTuple } from '@apollo/client';
import UserContext from 'contexts/UserContext';
import localforage from 'localforage';
import { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Token, User } from 'requests/Auth/types';
import { setAuthorizationBearer } from 'requests/Configs/client';
import { graphQLResult } from 'utils/graphql';

function useAuth<Arguments, Result extends { [key: string]: { user: User; token: Token } }>(
  fn: (options?: MutationHookOptions<Result, Arguments>) => MutationTuple<Result, Arguments>,
  stayConnected: boolean = true,
): MutationTuple<Result, Arguments> {
  const { setUser } = useContext(UserContext);
  const [call, state] = fn();
  const history = useHistory();
  function persistUser(data: { user: User; token: Token }) {
    const result = { ...data };
    if (!stayConnected) {
      // @ts-ignore
      delete result.token.refreshToken;
    }
    localforage.setItem('auth', JSON.stringify(result));
  }

  useEffect(() => {
    if (state.data) {
      if (stayConnected) {
        const result = graphQLResult(state.data);
        setAuthorizationBearer(result.token.accessToken);
        persistUser(result);
        setUser(result.user);
      } else {
        toast.success('Vous pouvez vous connecter dès que le service commercial activera votre compte');
        history.push('/login');
      }
    }
    // eslint-disable-next-line
  }, [state.data]);

  return [call, state];
}

export default useAuth;
