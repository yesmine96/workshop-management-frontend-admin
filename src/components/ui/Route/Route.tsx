import Header from 'components/layout/header';
import SideBar from 'components/layout/sidebar';

import { Route as BaseRoute, RouteProps as BaseRouteProps } from 'react-router-dom';

export interface RouteProps extends BaseRouteProps {
  protected?: boolean;
  header: boolean;
}

const Route = ({ protected: protectedProp, header, ...rest }: RouteProps) => {
  return (
    <div className="flex h-screen">
      {header ? (
        <>
          <div className="flex-[0.1] 2xl:flex-[0.1] xl:flex-[0]  ">
            <SideBar />
          </div>
          <div className=" flex-[0.9] 2xl:flex-[0.9] xl:flex-[1] py-[46px] px-[36px] xl:px-[10px] xl:mb-[40px]  overflow-auto ">
            <Header />
            <BaseRoute {...rest} />
          </div>
        </>
      ) : (
        <div className=" flex-[1] 2xl:flex-[1] xl:flex-[1]    overflow-hidden ">
          <BaseRoute {...rest} />
        </div>
      )}
    </div>
  );
};

Route.defaultProps = {
  header: true,
};

export default Route;
