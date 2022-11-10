import React, { useMemo } from 'react';
import classNames from 'utils/classNames';

import GuideSelect, { LabelProps } from './Select/GuideSelect';

interface Props<T extends { id: string; name: string }> {
  onChange?: (value: LabelProps | null) => void;
  value?: string;
  isDisabled?: boolean;
  title: string;
  data?: T[];
  icon?: React.ReactNode;
  className?: string;
}
const Filter = <T extends { id: string; name: string }>({
  isDisabled,
  value,
  onChange,
  title,
  data,
  icon,
  className,
}: Props<T>) => {
  const options = useMemo(() => {
    if (!data) return [];
    return data.map((d) => ({ value: d.id, label: d.name }));
  }, [data]);

  const optionStyle = (old: any) => {
    const changes = {
      margin: 'auto',
      maxWidth: 'unset',
    };
    return Object.assign(old, changes);
  };

  const handleChange = (v: LabelProps | null) => {
    // eslint-disable-next-line
    if (onChange) onChange(v);
  };
  return (
    <div className={classNames('flex text-sm font-medium flex-col', className)}>
      <div className="block text-sm font-normal text-blue-600 pb-2">{title}</div>
      <GuideSelect
        isDisabled={isDisabled}
        icon={icon}
        placeholder={title}
        value={value}
        options={[
          { value: 'Tous', label: 'Tous' },
          ...options?.slice()?.sort((a, b) => a.label[0].localeCompare(b.label, 'es', { sensitivity: 'base' })),
        ]}
        onChange={handleChange}
        design={{ singleValue: optionStyle }}
      />
    </div>
  );
};

Filter.defaultProps = {
  isDisabled: false,
  value: '',
  onChange: () => {},
  data: [],
  icon: null,
  className: '',
};
export default Filter;
