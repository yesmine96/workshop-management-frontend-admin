import SelectArrow from 'components/icons/SelectArrow';
import React, { FC, useCallback } from 'react';
import Select, { ControlProps, Props as SelectProps, components, ValueContainerProps, MenuProps } from 'react-select';
import classNames from 'utils/classNames';

import classes from './select.module.scss';

const Menu = (p: MenuProps<LabelProps, false>) => {
  return <components.Menu {...p} className={classes.menu} />;
};

interface Props extends Omit<SelectProps<LabelProps, false>, 'value'> {
  value?: string;
  arrow?: boolean;
  className?: string;
  className2?: string;
}

export interface LabelProps {
  label: string;
  value: string;
}

const GuideSelect: FC<Props> = React.forwardRef(
  (
    { placeholder, icon, arrow = true, isDisabled, isNotSearchable, className, className2, ...props },
    ref: React.Ref<Select<LabelProps, false>>,
  ) => {
    const Control = useCallback(
      ({ children, ...rest }: ControlProps<LabelProps, false>) => {
        return (
          <components.Control
            className={classNames('w-full flex px-4 bg-white h-12 item-center', classes.control)}
            {...rest}
          >
            {icon}
            <div className="flex-1 text-left truncate">{children}</div>
            {arrow && <SelectArrow className="ml-2" fill={isDisabled ? '#B3B3B3' : '#393384'} />}
          </components.Control>
        );
      },
      [icon],
    );

    const ValueContainer = (p: ValueContainerProps<LabelProps, false>) => {
      return (
        <components.ValueContainer
          className={classNames(
            'w-full truncate placeholderColor text-base 2xl:text-sm text-medium lg:border-0	rounded-5 border-blue-600  text-grey-500',
            className,
          )}
          {...p}
        />
      );
    };

    const formatOptionLabel = ({ label, value }: LabelProps) => (
      <div
        key={value}
        className={classNames('flex justify-around w-full text-xs font-medium', classes.SelectTextLabel)}
      >
        <div id="selectLabel" className="flex-1 ">
          {label}
        </div>
      </div>
    );
    return (
      <Select
        isSearchable={!isNotSearchable}
        isDisabled={isDisabled}
        placeholder={placeholder}
        ref={ref}
        className={classNames('w-full', className, className2)}
        noOptionsMessage={() => 'Aucun résultat trouvé'}
        {...props}
        value={props.options.find((o: LabelProps) => o.value === props.value) || null}
        getOptionValue={(option) => option.value}
        formatOptionLabel={formatOptionLabel}
        styles={{
          menu: (old: any) => ({
            ...old,
          }),
          option: (old: any, state: any) => ({
            ...old,
            ':active': !state.isSelected &&
              !state.isDisabled && { backgroundColor: '#111136', color: 'white !important' },
            backgroundColor: !state.isSelected ? 'white' : '#00A1A2',
            '&:hover': { color: !state.isDisabled ? '#111136 ' : '' },
            color: state.isDisabled ? ' #C3C3C3' : [state.isSelected ? 'white !important' : 'black !important'],
            cursor: state.isDisabled ? 'auto' : 'pointer',
          }),
        }}
        components={{
          Control,
          ClearIndicator: null,
          DropdownIndicator: null,
          DownChevron: () => null,
          ValueContainer,
          Menu,
        }}
      />
    );
  },
);

export default GuideSelect;
