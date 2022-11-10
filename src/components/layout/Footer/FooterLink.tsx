import classNames from 'utils/classNames';
import { Link, useLocation } from 'react-router-dom';

import TitleLink from './TitleLink';

interface RowProps {
  className?: string;
  data: any[];
  title: string;
}

const Row: React.FC<RowProps> = ({ className, data, title }) => {
  const location = useLocation();
  return (
    <>
      <TitleLink title={title} className="pb-2" />
      <div className="grid grid-rows-3 grid-flow-col	gap-x-16 lg:grid-flow-row">
        {data.map((d) => (
          <Link
            key={d.id}
            to={d.pathname}
            className={classNames(
              'pb-2 w-full text-grey-700 flex flex-row items-center',
              'cursor-pointer hover:text-green',

              className,
            )}
          >
            <div
              onClick={() => location.pathname && window.scroll({ top: 0 })}
              className="flex-1 text-current font-normal text-base  2xl:text-sm"
            >
              {d.title}
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Row;
