import GuideSelect from './Select/GuideSelect';

export interface LabelProps {
  value: string;
  label: string;
}
export const OptionAZ: LabelProps[] = [
  {
    value: '1',
    label: 'De A-Z',
  },
  {
    value: '-1',
    label: 'De Z-A',
  },
];

interface Props {
  setSortChoosed: (value: LabelProps | null) => void;
  sortChoosed: string;
}
const FilterByAZ = ({ sortChoosed, setSortChoosed }: Props) => {
  const handleChange = (value: LabelProps | null) => {
    setSortChoosed(value);
  };

  return (
    <div className="rounded m-0 border border-blue-50 Selectbackground">
      <label // eslint-disable-line
        className=" flex items-center relative"
      >
        <GuideSelect placeholder="De A-Z" value={sortChoosed} options={OptionAZ} onChange={handleChange} />
      </label>
    </div>
  );
};

export default FilterByAZ;
