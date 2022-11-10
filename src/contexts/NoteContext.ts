import { createContext } from 'react';
import { Note } from 'requests/types';

export default createContext<{ note: Note | null; setNote: (note: Note | null) => void }>({
  note: null,
  setNote: () => {},
});
