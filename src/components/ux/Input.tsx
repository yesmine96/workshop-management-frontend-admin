import React, { FunctionComponent, ReactNode, useState } from 'react';
import classNames from 'utils/classNames';
import InputWrapper from './InputWrapper';

export type TextFieldProps = {
  type?: string;
  error?: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  addnote?: boolean;
  label?: string;
  labelClassName?: string;
  errorClassName?: string;
  handleError?: boolean;
  textarea?: boolean;
  errorColor?: string;
} & (
  | (React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLInputElement>, HTMLInputElement> & { textarea?: false })
  | (React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> & {
      textarea: true;
    })
);

const Input: FunctionComponent<TextFieldProps> = ({
  type,
  iconLeft,
  error,
  addnote,
  iconRight,
  label,
  handleError = true,
  textarea = false,
  errorColor = '!text-[#FF4040]',
  errorClassName,
  className,
  labelClassName,
  ...rest
}) => {
  const [showPassword] = useState(false);

  const inputHeight = 'h-12 2xl:h-12';

  const inputClasses = classNames(
    'bg-[#F5F5F5] w-full	border-[1px] border-[#C2C2C2] placeholder-[#C2C2C2] rounded-xl focus:ring-0 focus:outline-none p-[1rem] py-4 md:rounded-3',
    'text-base font-regular  bg-white active:bg-white',
    textarea ? 'resize-none' : inputHeight,
    error && `border-[#FF4040] border-2 focus:border-[#FF4040]`,
    iconLeft && 'pl-16',
    addnote && 'pl-2.5 !important',
    className,
  );

  return (
    <InputWrapper
      error={error}
      iconRight={iconRight}
      iconLeft={iconLeft}
      errorColor={errorColor}
      label={label}
      errorClassName={errorClassName}
      labelClassName={labelClassName}
      handleError={handleError}
      classes={{ iconRight: textarea ? `top-0 ${inputHeight}` : undefined }}
    >
      {textarea ? (
        <textarea className={inputClasses} {...(rest as any)} />
      ) : (
        <input className={inputClasses} type={type === 'password' && showPassword ? 'text' : type} {...(rest as any)} />
      )}
      {/* {type === "password" && (
        <div
          className="absolute inset-y-0 right-5 flex items-center justify-center"
          onClick={() => setShowPassword(!showPassword)}
        >
          <button type="button" className="focus:outline-none ">
            {!error ? (
              <PasswordIcon fill="#111136" width="25px" />
            ) : (
              <WrongPassword className="w-6" />
            )}
          </button>
        </div>
      )} */}
    </InputWrapper>
  );
};

export default Input;
