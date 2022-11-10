import { ButtonHTMLAttributes, FunctionComponent } from 'react';
import classNames from 'utils/classNames';

export type ButtonProps = {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'quaternary'
    | 'quinary'
    | 'senary'
    | 'septenary'
    | 'octonary'
    | 'tertiary2'
    | 'octoExtraordinary';
  icon?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const variants = {
  primary: 'bg-green hover:bg-blue-600 hover:text-black text-grey-100 hover:outline-none font-medium   ',
  secondary: [
    'font-medium bg-blue-600 text-black hover:bg-white hover:outline-none hover:text-white focus:ring-grey-600 ',
  ],

  tertiary: [
    'bg-blue-601 hover:bg-white border border-grey-100 text-grey-100',
    'hover:outline-none hover:text-blue-450 hover:bg-grey-100 ',
  ],
  tertiary2: [
    'bg-blue hover:bg-yellow border border-grey-100 text-grey-100',
    'hover:outline-none hover:text-white hover:bg-grey-100 ',
  ],
  quaternary:
    'font-medium bg-blue-600 text-black hover:bg-white hover:outline-none hover:text-blue-600 focus:ring-grey-600 ',
  quinary:
    'bg-green hover:bg-white hover:text-green text-grey-100 hover:outline-none font-medium border border-white  ',
  senary: 'bg-blue-600 hover:bg-green hover:text-white text-black hover:outline-none font-medium border border-white  ',
  septenary: 'bg-red-200 hover:bg-red-300 text-white hover:outline-none font-medium ',
  octonary: 'bg-white border-2 border-blue-600 hover:border-grey-350  text-blue-600  font-medium ',
  octoExtraordinary:
    'bg-blue-601 hover:bg-green hover:text-white text-grey-100 hover:outline-none font-medium border border-white  ',
};

const sizes = {
  sm: ' w-8 h-12',
  md: 'h-12 w-64	text-lg',
  lg: 'h-14 w-64 text-xl',
  xl: 'h-12 w-96 text-xl',
};

const Button: FunctionComponent<ButtonProps> = ({ variant, size = 'md', icon, children, className, ...rest }) => {
  const classes = classNames(
    ' focus:outline-none focus:ring-0 rounded-5 disabled:hover:bg-grey-600 disabled:cursor-default',
    'flex flex-row items-center justify-center space-x-2 ',
    variant && variants[variant],
    sizes[size],
    className,
  );
  return (
    <button className={classes} {...rest}>
      {icon && <img src={icon} alt="" className="mr-2" />}
      {children}
    </button>
  );
};

export default Button;
