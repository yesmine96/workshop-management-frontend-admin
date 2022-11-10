import React from 'react';
import classNames from 'utils/classNames';

interface HeaderLinkProps
  extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  selected?: boolean;
  open?: boolean;
}

const HeaderLink = React.forwardRef(
  ({ children, className, selected, open, ...rest }: HeaderLinkProps, ref: React.Ref<HTMLButtonElement>) => (
    <>
      <button
        ref={ref}
        {...rest}
        className={classNames(
          'font-medium text-sm flex h-full hover:text-600   px-4  2xl:text-xs',
          'cursor-pointer hover:text-black items-center 	',
          open ? 'text-blue  text-black' : selected ? 'text-black' : 'text-blue-600', // eslint-disable-line
          className,
        )}
      >
        {children}
      </button>
    </>
  ),
);

HeaderLink.defaultProps = {
  selected: false,
  open: false,
};

export default HeaderLink;
