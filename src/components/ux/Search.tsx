import SearchIcon from 'components/icons/SearchIcon';
import Button from 'components/ux/Button';
import Input from 'components/ux/Input';
import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import classNames from 'utils/classNames';
import DatePickerInput from './DatePickerInput';

export type Props = {
  button?: boolean;
  mobile?: boolean;
  inputClasses?: string;
  placeholder?: string;

  onChange?: (v: string) => void;
  onSearch?: (value: string) => void;
};

const Search: FunctionComponent<Props> = ({ inputClasses, onChange, placeholder, onSearch }: Props) => {
  const isBrowser = typeof window !== 'undefined';
  const [width, setWidth] = useState(isBrowser ? window.innerWidth : 0);
  const [searchValue, setsearchValue] = useState('');
  const [, setOpen] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);
  const [dateStart, setDateStart] = useState<any>('');
  const [dateEnd, setDateEnd] = useState<any>('');

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
  }, [width]);

  return (
    <>
      <form
        className={classNames('flex  sm:w-auto xl:w-full gap-4')}
        onSubmit={(e) => {
          onSearch && onSearch(searchValue);
          e.preventDefault();
        }}
      >
        <DatePickerInput
          value={dateStart}
          name="dateStart"
          onChange={(date) => {
            setDateStart(date);
          }}
          showTimeSelect={false}
          className2="w-[60px]"
          placeholderText="De"
        />
        <DatePickerInput
          value={dateEnd}
          name="dateEnd"
          onChange={(date) => {
            setDateEnd(date);
          }}
          showTimeSelect={false}
          className2="w-[60px]"
          placeholderText="Jusqu'à"
        />
        <div className="flex relative w-[250px] " ref={divRef}>
          <Input
            className={inputClasses}
            value={searchValue}
            onChange={(e) => {
              setsearchValue(e.target.value);
              if (onChange) onChange(e.target.value);
              if (e.target.value.length > 0) {
              } else setOpen(false);
            }}
            placeholder={placeholder || 'Rechercher une formation'}
          />
          <div className="rounded absolute w-[40px] h-full flex top-[15px] left-[25px] ">
            <SearchIcon className=" text-white m-auto" />
          </div>
        </div>

        <Button
          type="submit"
          className="text-[14px] rounded-[12px] border-l-2 px-2 py-4	mx-2  
           text-white font-CalibreSemiBold bg-[#00458b] hover:text-white w-[fit-content]"
        >
          Rechercher
        </Button>

        {/* <DropDown
          anchorEl={divRef}
          open={open}
          onClose={() => setOpen(false)}
          className="rounded-3 	"
        >
          <h1>Recherche...</h1>
        </DropDown> */}
      </form>
    </>
  );
};

export default Search;
