import React, { FunctionComponent, ReactNode, useState } from 'react';
import classNames from 'utils/classNames';
import PasswordIcon from '../icons/Password';
import { ReactComponent as WrongPassword } from '../../assets/svg/Passwordyellow.svg';
import InputWrapper from './InputWrapper';

export type TextFieldProps = {
  type?: string;
  error?: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  addnote?: boolean;
  label?: string;
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
  errorColor = 'red-250',
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputHeight = 'h-12 2xl:h-12';

  const inputClasses = classNames(
    'w-full	border rounded-5 focus:ring-0 focus:outline-none p-7 py-4',
    'text-base font-regular border-blue-80 bg-white active:bg-white',
    textarea ? 'resize-none' : inputHeight,
    error && `border-${errorColor} border-2 focus:border-${errorColor}`,
    iconLeft && 'pl-16',
    addnote && 'pl-2.5 !important',
  );

  return (
    <InputWrapper
      error={error}
      iconRight={iconRight}
      iconLeft={iconLeft}
      errorColor={errorColor}
      label={label}
      handleError={handleError}
      classes={{ iconRight: textarea ? `top-0 ${inputHeight}` : undefined }}
    >
      {textarea ? (
        <textarea className={inputClasses} {...(rest as any)} />
      ) : (
        <input className={inputClasses} type={type === 'password' && showPassword ? 'text' : type} {...(rest as any)} />
      )}
      {type === 'password' && (
        <div
          className="absolute inset-y-0 right-5 flex items-center justify-center"
          onClick={() => setShowPassword(!showPassword)}
        >
          <button type="button" className="focus:outline-none ">
            {!error ? <PasswordIcon fill="#111136" width="25px" /> : <WrongPassword className="w-6" />}
          </button>
        </div>
      )}
    </InputWrapper>
  );
};

export default Input;
