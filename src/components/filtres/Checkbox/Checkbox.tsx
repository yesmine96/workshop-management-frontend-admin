import React, { FC, useRef } from 'react';
import classNames from 'utils/classNames';

interface Props {
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
}

const CheckBox: FC<Props> = ({ checked, onChange, label }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      onClick={() => {
        if (inputRef.current) inputRef.current.click();
      }}
      className="w-full flex py-2 items-center cursor-pointer"
    >
      <span className="pr-2.5 text-base flex-1 text-grey-600 2xl:text-sm">{label}</span>
      <div
        className={classNames(
          '2xl:h-5 2xl:w-5 h-6 w-6 border-2 rounded-5',
          checked ? 'bg-green border-green' : 'border-blue-600',
        )}
      />
      <input
        ref={inputRef}
        className="hidden"
        type="checkbox"
        checked={checked}
        onChange={onChange}
        defaultChecked={false}
      />
    </div>
  );
};

export default CheckBox;
