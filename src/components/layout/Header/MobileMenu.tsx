import React, { FunctionComponent } from 'react';
import classNames from 'utils/classNames';

interface Props {
  className?: string;
  type?: string;
  responsiveMenuState: boolean;
}

const MobileMenu: FunctionComponent<Props> = ({ responsiveMenuState, type, className, children, ...props }) => {
  return (
    <>
      <div
        {...props}
        className={classNames(
          'fixed overflow-hidden h-screen w-screen top-0 left-0 z-20 transition-transform duration-700',
          `flex flex-col justify-center items-center ${className}`,
        )}
        style={{
          background: type === 'filter' ? '#F5F5F7' : 'white',
          transform: `translateX(${responsiveMenuState ? '0%' : '200%'})`,
        }}
      >
        {children}
      </div>
    </>
  );
};

export default MobileMenu;
