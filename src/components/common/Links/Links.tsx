import { encodeUri } from 'utils/url';

import { Link, useHistory, useLocation } from 'react-router-dom';
import ArrowRight from 'components/icons/ArrowRight';
import classNames from 'utils/classNames';
import classes from './Links.module.scss';

interface Props {
  title: string;
  children?: React.ReactChild | React.ReactChild[];
  pathname: string;
  description?: string;
  textSelected?: string;
  id?: string;
  type?: string | number;
}

const Links: React.FC<Props> = ({ title, children, pathname, description, textSelected, type = '', id = '' }) => {
  const location = useLocation();
  const history = useHistory();

  return (
    <div className="flex items-center text-grey-400 text-lg font-medium md:text-sm sm:text-xs md:relative md:pb-20">
      <Link to={pathname} className="underline cursor-pointer flex items-center">
        {title}
        <ArrowRight fill="#F8A609" height={12} className="cursor-pointer pl-3 md:pl-1" />
      </Link>
      {textSelected ? (
        <div
          className={classNames('px-3 md:px-1 md:text-xs underline cursor-pointer flex items-center', classes.content)}
        >
          {description}
          <ArrowRight fill="#F8A609" height={12} className="cursor-pointer  pl-3 md:pl-1" />
        </div>
      ) : (
        <div className="pl-3 ">{description}</div>
      )}
      {children && textSelected && (
        <div
          className=" cursor-pointer md:absolute md:top-8"
          onClick={() =>
            history.replace({
              pathname: location.pathname,
              search: encodeUri({ [type]: id }),
            })
          }
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default Links;
