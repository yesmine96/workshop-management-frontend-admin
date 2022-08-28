export default function transformSelect(data: any) {
  let array: { value: string; label: string }[] = [];
  data?.map(({ fullName, name, id }: any) => {
    return array.push({ value: id, label: name || fullName });
  });

  return array;
}
