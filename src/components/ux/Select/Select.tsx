import SelectArrow from 'components/icons/SelectArrow';
import React, { FC } from 'react';
import Select, { components, OptionsType, StylesConfig } from 'react-select';
import classNames from 'utils/classNames';

interface TypeSelect {
  label: string;
  value: string;
}

export interface Props {
  options: OptionsType<TypeSelect> | undefined;
  onChange: (all: OptionsType<TypeSelect>) => void;
  error?: string[] | string;
  handleError?: boolean;
  name?: string;
  labelSelect?: string;
  icon?: string;
  isMulti: boolean;
  isDisabled?: boolean;
  className?: { parentClassName?: string; selectClassName?: string };
  values?: OptionsType<TypeSelect>;
  placeholder?: string;
  labelClassname?: string;
  closeMenuOnSelect?: boolean;
}

const MultiSelect: FC<Props> = ({
  className,
  options,
  onChange,
  error,
  handleError,
  name,
  labelSelect,
  isMulti = true,
  isDisabled = false,
  values,
  placeholder,
  closeMenuOnSelect,
  labelClassname,
}: Props) => {
  const customStyles: StylesConfig<TypeSelect, true> = {
    option: () => ({
      color: '#0B0329',
      padding: 5,
    }),
    control: () => ({
      // none of react-select's styles are passed to <Control />
      width: '100%',
      color: '#0B0329',
      display: 'flex',
      flexDirection: 'row',
      background: '#F5F5F5',
      height: '50%',
      padding: '5px 5px 5px 22px',
      borderRadius: '8px',
      border: error ? '1px solid #FF6545' : 'none',
    }),
    valueContainer: () => ({
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      '@media only screen and (max-width: 600px)': {
        height: '30px',
        overflow: 'auto',
      },
    }),
    multiValue: () => ({
      width: '100px',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    }),
    multiValueRemove: () => ({
      borderRadius: '100%',
      height: '20px',
      width: '20px',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      border: '1px solid #70707080',
      backgroundColor: '#7070701F',
      alignItems: 'center',
    }),
    menuList: (base) => ({
      ...base,
      // kill the white space on first and last option
      padding: 0,
    }),
    indicatorSeparator: (base) => ({
      ...base,
      display: 'none',
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: '#0B0329',
    }),
  };
  const DropdownIndicator = (props: any) => {
    return (
      <components.DropdownIndicator {...props}>
        <SelectArrow className="ml-2 cursor-pointer" fill={isDisabled ? '#B3B3B3' : '#0B0329'} />
      </components.DropdownIndicator>
    );
  };
  return (
    <div className={classNames('w-full', className?.parentClassName)}>
      {labelSelect && (
        <div
          className={`text-blue ${labelClassname} font-CalibreSemiBold  2xl:mb-1 md:text-17 lg:text-17 text-20 2xl:text-20 flex items-center`}
        >
          {' '}
          {labelSelect}
        </div>
      )}
      <div className="relative">
        <Select
          value={values}
          isDisabled={isDisabled}
          closeMenuOnSelect={closeMenuOnSelect}
          isMulti={isMulti || undefined}
          className={classNames('mb-1', className?.selectClassName)}
          options={options}
          placeholder={placeholder || ''}
          name={name}
          styles={customStyles}
          components={{ DropdownIndicator }}
          onChange={(all: OptionsType<TypeSelect>) => onChange(all)}
        />
        {handleError && (
          <div
            className={classNames(
              'truncate absolute top-[45px] text-[#FF6545]  text-sm 2xl:text-xs font-CalibreRegular  left-1  w-[-webkit-fill-available] ',
            )}
          >
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiSelect;
