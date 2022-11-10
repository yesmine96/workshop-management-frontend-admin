import MenuContext, { MenuStatesValues } from 'contexts/MenuContext';
import { useState } from 'react';
import WebMenu from './WebMenu';

const Header = () => {
  const [MenuStates, setMenuStates] = useState<MenuStatesValues | any>(MenuStatesValues.CLOSE);

  return (
    <>
      <MenuContext.Provider value={{ MenuStates, setMenuStates }}>
        <WebMenu />
      </MenuContext.Provider>
    </>
  );
};

export default Header;
