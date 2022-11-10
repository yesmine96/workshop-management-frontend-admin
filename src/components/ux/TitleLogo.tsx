import React, { FunctionComponent } from 'react';

export type TitleLogoProps = {
  logo?: string;
  title?: string;
  subtitle?: string;
};

const TitleLogo: FunctionComponent<TitleLogoProps> = ({ logo, title, subtitle, children, ...rest }) => {
  return (
    <div
      className="flex flex-col justify-center items-center mb-14 sm:mb-0 sm:py-8 bg-contain bg-center 2xl:mb-0 2xl:py-4"
      {...rest}
    >
      {logo && (
        <div>
          {' '}
          <img src={logo} alt="" className="2xl:w-212 w-275	md:w-173 lg:w-56" />
        </div>
      )}
      {title && (
        <div className="text-green font-semibold text-4xl	2xl:text-26	mt-2 sm:text-xl 2xl:mt-0 lg:mt-2"> {title} </div>
      )}
      {subtitle && <div className=" font-medium text-grey-450 mt-2 text-sm	lg:text-xs	"> {subtitle} </div>}
    </div>
  );
};

export default TitleLogo;
