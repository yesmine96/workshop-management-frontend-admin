import CheckBox from './Checkbox/Checkbox';

interface Props<T extends { id: string; name: string }> {
  handleChoosed: (v: any[]) => void;
  indications?: string;
  data?: T[];
}
const FilterCheckbox = <T extends { id: string; name: string }>({
  data,
  handleChoosed,
  indications: indicationsProps,
}: Props<T>) => {
  const indications = indicationsProps?.split(',') || [];
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    if (e.target.checked) {
      handleChoosed([...indications, id].filter((ee) => ee.length));
    } else {
      handleChoosed(indications.filter((ind: any) => ind !== id).filter((ee) => ee.length));
    }
  };

  return (
    <div className="flex flex-col ">
      {data
        ?.slice()
        ?.sort((a, b) => a.name[0].localeCompare(b.name, 'es', { sensitivity: 'base' }))
        ?.map(({ name, id }) => (
          <CheckBox
            key={name}
            label={name?.replace(/^./, name[0].toUpperCase())}
            onChange={(e) => handleChange(e, String(id))}
            checked={!!indications.find((e) => e === String(id))}
          />
        ))}
    </div>
  );
};

FilterCheckbox.defaultProps = {
  indications: '',
  data: [],
};
export default FilterCheckbox;
