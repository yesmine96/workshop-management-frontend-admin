import { createContext } from 'react';

export enum MenuStatesValues {
  CLOSE = 'CLOSE',
  mainMenu = 'mainMenu',
  mainMedicineMenu = 'mainMedicineMenu',
  aboutMenu = 'aboutMenu',
  mySpaceMenu = 'mySpaceMenu',
  classeMenu = 'classeMenu',
  dciMenu = 'dciMenu',
  genericMenu = 'genericMenu',
  trainingsMenu = 'trainingsMenu',
}

export default createContext<{
  MenuStates: MenuStatesValues | null;
  setMenuStates: (user: keyof typeof MenuStatesValues | null) => void;
}>({
  MenuStates: null,
  setMenuStates: () => {},
});
