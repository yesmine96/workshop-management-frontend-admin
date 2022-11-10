import React, { FunctionComponent, ReactNode } from 'react';
import classNames from 'utils/classNames';

export type TextFieldProps = {
  label?: string;
  error?: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  errorColor?: string;
  children: React.ReactNode;
  handleError?: boolean;
  classes?: {
    iconsLeft?: string;
    iconRight?: string;
  };
};

const InputWrapper: FunctionComponent<TextFieldProps> = ({
  iconLeft,
  error,
  iconRight,
  label,
  errorColor = 'red-250',
  handleError = true,
  children,
  classes = {},
}) => {
  return (
    <div className={classNames(handleError && 'pb-2', 'w-full')}>
      {label && <div className="text-blue-650 text-md font-regular mb-2.5 md:text-sm">{label}</div>}
      <div className="flex justify-center items-center relative">
        {iconLeft && (
          <div className={classNames('absolute inset-y-0 left-5 flex items-center justify-center', classes.iconsLeft)}>
            {iconLeft}
          </div>
        )}
        {children}
        {iconRight && (
          <div className={classNames('absolute inset-y-0 right-5 flex items-center justify-center', classes.iconRight)}>
            <button type="button" className="focus:outline-none ">
              {iconRight}
            </button>
          </div>
        )}
      </div>
      {handleError && error && (
        <div className={classNames('2xl:text-xs mt-1.5 text-sm h-5 relative left-1 sm:text-10', `text-${errorColor}`)}>
          {error}
        </div>
      )}
    </div>
  );
};

export default InputWrapper;
