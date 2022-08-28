import SearchIcon from 'components/icons/SearchIcon';
import Button from 'components/ux/Button';
import Input from 'components/ux/Input';
import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import classNames from 'utils/classNames';

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

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
  }, [width]);

  return (
    <>
      <form
        className={classNames('flex  sm:w-auto xl:w-full')}
        onSubmit={(e) => {
          onSearch && onSearch(searchValue);
          e.preventDefault();
        }}
      >
        <div className="flex relative w-full   " ref={divRef}>
          <Input
            className={inputClasses}
            value={searchValue}
            onChange={(e) => {
              setsearchValue(e.target.value);
              if (onChange) onChange(e.target.value);
              if (e.target.value.length > 0) {
              } else setOpen(false);
            }}
            placeholder={placeholder || 'Entrer le code du colis'}
          />
          <div className="rounded absolute w-[40px] h-full flex top-[15px] left-[25px] ">
            <SearchIcon className=" text-white m-auto" />
          </div>
        </div>

        <Button
          type="submit"
          className="text-lg rounded-[12px] border-l-2 px-4 py-4	mx-2  
           text-gray font-CalibreSemiBold bg-gray-100 hover:text-white w-[fit-content]"
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
