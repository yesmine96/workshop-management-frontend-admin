import Calendar from 'components/icons/Calender';
import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface Props {
  className?: string;
  value?: string;
  onChange?: (date: Date) => void;
  name?: string;
}

export default function DatePickerInput({ className, onChange, value, name }: Props) {
  return (
    <div
      className={`px-3 border-[#E6E6E6] border-[1px]  flex items-center  gap-4 h-[50px]  bg-[#F5F5F5] py-2 rounded-xl ${className}`}
    >
      <Calendar className="!w-[25px] !h-[25px]" />
      <DatePicker
        showTimeSelect
        name={name}
        value={value}
        className="text-[14px] bg-[transparent] text-gray font-semibold px-0 "
        selected={value ? new Date(value) : new Date()}
        onChange={(date: Date) => {
          if (onChange) onChange(date);
        }}
        dateFormat="MMMM d, yyyy h:mm aa"
      />
    </div>
  );
}
