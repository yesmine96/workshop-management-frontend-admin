import { createContext } from 'react';

export default createContext<{ cardId: string | null; setCardId: (cardId: string | null) => void }>({
  cardId: null,
  setCardId: () => {},
});
