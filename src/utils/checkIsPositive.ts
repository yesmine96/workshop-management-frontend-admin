export const checkIsPositive = (e: number | string) => {
  if (e >= 0) {
    return e;
  } else return 0;
};
