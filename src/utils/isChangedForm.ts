export const isChangedForm = (initialObj: Record<string, any> = {}, FormObj: Record<string, any>): boolean => {
  for (var prop in FormObj) {
    if (initialObj[prop] && FormObj[prop] !== initialObj[prop]) {
      return true;
    }
  }
  return false;
};
