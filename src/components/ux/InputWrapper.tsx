import React, { FunctionComponent, ReactNode } from 'react';
import classNames from 'utils/classNames';

export type TextFieldProps = {
  label?: string;
  error?: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  errorColor?: string;
  errorClassName?: string;
  labelClassName?: string;

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
  errorColor = '!text-[#FF4040]',
  handleError = true,
  children,
  labelClassName,
  errorClassName,
  classes = {},
}) => {
  return (
    <div className={classNames('pb-3', 'w-full relative')}>
      {label && <div className={`text-blue text-md font-regular mb-1 md:text-sm ${labelClassName}`}>{label}</div>}
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
        <div
          className={classNames(
            'lg:text-xs text-sm h-5 relative left-1',
            `${errorColor} absolute`,
            errorClassName,
            '!absolute',
          )}
        >
          {error}
        </div>
      )}
    </div>
  );
};

export default InputWrapper;
