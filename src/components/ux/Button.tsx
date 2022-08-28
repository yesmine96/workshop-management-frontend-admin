import Loading from 'components/ui/Loading/Loading';
import { ButtonHTMLAttributes, FunctionComponent } from 'react';
import classNames from 'utils/classNames';

export type ButtonProps = {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'none';
  variant?: 'primary' | 'secondary' | 'tertiary' | 'quaternary' | 'tertiary2' | 'quinary';
  icon?: string;
  loading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const variants = {
  primary: 'hover:bg-blue-600 bg-yellow text-grey-100 hover:outline-none font-medium ',

  secondary: [
    'bg-blue hover:bg-blue-600 border border-transparent',
    'text-white active:bg-blue-700 focus:ring-blue-800 active:bg-blue-600',
  ],

  tertiary: [
    'bg-blue hover:bg-white border border-grey-100 text-grey-100 font-medium',
    'hover:outline-none hover:text-blue-900 hover:bg-grey-100 hover:border-none ',
  ],
  tertiary2: [
    'bg-blue hover:bg-yellow border border-grey-100 text-grey-100',
    'hover:outline-none hover:text-white hover:bg-grey-100 ',
  ],
  quaternary: 'font-medium bg-yellow hover:bg-white hover:outline-none hover:text-blue  ',
  quinary: 'bg-white hover:bg-yellow text-yellow hover:outline-none font-medium hover:text-white',
};

const sizes = {
  none: '',
  sm: ' w-8 h-12',
  md: 'h-12 w-32	text-lg',
  lg: 'h-14 w-64 text-xl',
  xl: 'h-16 w-64 text-2xl',
};

const Button: FunctionComponent<ButtonProps> = ({
  variant,
  size = 'md',
  icon,
  children,
  loading,
  className,
  ...rest
}) => {
  const classes = classNames(
    ' relative focus:outline-none focus:ring-0 rounded-5 md:rounded-3 disabled:hover:bg-grey-600 disabled:cursor-default',
    'flex flex-row items-center justify-center space-x-2 ',
    variant && variants[variant],
    sizes[size],
    className,
  );
  return (
    <button className={classes} {...rest}>
      {loading ? (
        <div className="scale-[0.2] absolute">
          <Loading color="white" />
        </div>
      ) : (
        <>{icon && <img src={icon} alt="" className="mr-2" />}</>
      )}
      <div className={`flex items-center justify-center cursor-pointer ${loading && 'opacity-0'}`}>{children}</div>
    </button>
  );
};

export default Button;
