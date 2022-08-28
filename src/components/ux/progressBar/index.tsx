import React, { FC } from 'react';
import Step from './Step';

interface stepType {
  stepIndex: number;
  stepName: string;
}

interface progressBarStepsProps {
  steps: stepType[];
  activeStepIndex: number;
}
const ProgressBarSteps: FC<progressBarStepsProps> = ({ steps, activeStepIndex }) => {
  return (
    <div className="w-full h-[22px] bg-[#EFEBF7] rounded-full dark:bg-gray-700 mb-[44px] flex flex-row">
      {steps.map(({ stepIndex, stepName }, key) => (
        <Step
          key={key}
          stepIndex={stepIndex}
          stepName={stepName}
          length={steps.length}
          isActive={activeStepIndex >= stepIndex}
        />
      ))}
    </div>
  );
};

export default ProgressBarSteps;
