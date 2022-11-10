import { ApolloError } from '@apollo/client';
import { useState, useEffect } from 'react';
import { useError } from './apollo';

export default function useSnackbarState(state: { loading: boolean; error?: ApolloError }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  useError(state, (e) => setMessage(e));

  useEffect(() => {
    if (!state.loading && message) {
      setOpen(true);
    }
  }, [message, state.loading]);

  function onClose() {
    setOpen(false);
  }

  return { open, message, onClose };
}
