import React, { FC } from 'react';

interface IStepProps {
  stepIndex: number;
  stepName: string;
  isActive: boolean;
  length: number;
}
const Step: FC<IStepProps> = ({ stepIndex, stepName, isActive, length }) => {
  return (
    <div
      className={`h-full ${isActive && 'bg-[#6237B2]'} text-xs font-medium text-blue-100 text-center leading-none ${
        stepIndex === 1 && 'rounded-l-full'
      } w-[100%] relative ${stepIndex === length && 'rounded-r-full'}`}
    >
      <div className="absolute  bottom-[-35px] text-left text-[#818181] md:hidden ">{stepName}</div>
    </div>
  );
};

export default Step;
