import React, { FC, useRef } from 'react';
// import classNames from 'utils/classNames';

interface Props {
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
}

const CheckBox2: FC<Props> = ({ checked, onChange, label }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div className="w-full flex items-center justify-between cursor-pointer pb-8">
      <input
        onClick={() => {
          if (inputRef.current) inputRef.current.click();
        }}
        className=""
        ref={inputRef}
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <span className="pl-2.5 text-base flex-1 text-white 2xl:text-sm">{label}</span>
    </div>
  );
};

export default CheckBox2;
