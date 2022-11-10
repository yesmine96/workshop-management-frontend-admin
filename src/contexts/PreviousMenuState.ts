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
  PreviousStates: MenuStatesValues | null;
  setPreviousStates: (user: keyof typeof MenuStatesValues | null) => void;
}>({
  PreviousStates: null,
  setPreviousStates: () => {},
});
