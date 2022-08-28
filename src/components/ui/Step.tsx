import React from 'react';
interface IStepProp {
  activeStepIndex: number;
  stepIndex: number;
  stepName: string;
  stepDescription: string;
}
const Step = ({ activeStepIndex, stepName, stepIndex, stepDescription }: IStepProp) => {
  return (
    <div
      className={`stepper-item  bg-[#FAE2D3] flex items-center justify-center w-8 h-8 z-10 text-center font-medium border-[2px] ${
        activeStepIndex >= stepIndex ? 'border-[#E56E1B] text-[#E56E1B]' : ''
      } rounded-full`}
    >
      <div
        className={`h-2 w-2 rounded-full relative bg-white ${activeStepIndex >= stepIndex ? '!bg-[#E56E1B]' : ''}`}
      />
      <div className="absolute left-[50px] flex flex-col justify-start text-left ">
        <p className="min-w-max  text-xl">{stepName}</p>
        <p className="min-w-max  text-sm text-black">{stepDescription}</p>
      </div>
    </div>
  );
};

export default Step;
