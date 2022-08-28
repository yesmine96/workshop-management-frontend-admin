export const transformNull = <T extends Record<string, any>>(obj: T) => {
  let newObj: Record<string, string | boolean> = {};
  for (var prop in obj) {
    newObj[prop] = obj[prop] || '';
  }
  return newObj;
};
