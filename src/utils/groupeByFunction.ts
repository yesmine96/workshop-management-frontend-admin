export const groupByKey = (array: any, key: any) => {
  return array.reduce((hash: any, obj: any) => {
    if (obj[key] === undefined) return hash;
    return Object.assign(hash, { [obj[key]]: (hash[obj[key]] || []).concat(obj) });
  }, {});
};

export function dateDiff(date1: any, date2: any) {
  const diff: any = {}; // Initialisation du retour
  let tmp = date2 - date1;

  tmp = Math.floor(tmp / 1000); // Nombre de secondes entre les 2 dates
  diff.sec = tmp % 60; // Extraction du nombre de secondes

  tmp = Math.floor((tmp - diff?.sec) / 60); // Nombre de minutes (partie entière)
  diff.min = tmp % 60; // Extraction du nombre de minutes

  tmp = Math.floor((tmp - diff.min) / 60); // Nombre d'heures (entières)
  diff.hour = tmp % 24; // Extraction du nombre d'heures

  tmp = Math.floor((tmp - diff.hour) / 24); // Nombre de jours restants
  diff.day = tmp;

  return diff;
}
