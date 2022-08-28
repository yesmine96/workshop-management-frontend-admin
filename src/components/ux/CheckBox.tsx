import React from 'react';

interface Props {
  label?: string;
  className?: string;
  leftText?: boolean;
  checked?: boolean;

  labelclassName?: string;
  name?: string;
  type?: 'checkbox' | 'radio';
  onChecked: (v: boolean) => void;
  onChange?: (v: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CheckBox({
  label,
  className,
  onChecked,
  checked,
  name,
  leftText,
  onChange,
  labelclassName,
  type = 'checkbox',
}: Props) {
  return (
    <div className={`flex ${leftText && 'flex-row-reverse'} items-center gap-[16px] ${className}`}>
      <input
        name={name}
        onChange={(e) => {
          if (onChange) {
            onChange(e);
          }
          onChecked(e.target.checked);
        }}
        checked={checked}
        type={type}
      />
      {label && <label className={labelclassName}>{label}</label>}
    </div>
  );
}
