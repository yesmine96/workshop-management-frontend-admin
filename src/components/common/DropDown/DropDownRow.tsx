import { Link } from 'react-router-dom';
import classNames from 'utils/classNames';

interface RowProps {
  Image?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  onClick: () => void;
  className?: string;
  width?: number;
  selected?: boolean;
  pathname: string;
}

const Row: React.FC<RowProps> = ({ Image, title, onClick, className, width = 18, selected, pathname }) => {
  return (
    <Link
      to={pathname}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      className={classNames(
        'w-full flex flex-row p-4 lg:p-1 lg:py-3  md:p-1 md:py-3  items-center md:items-start lg:items-start',
        'hover:bg-blue-600 cursor-pointer hover:text-black',
        selected ? ' text-white' : 'text-blue-600',
        className,
      )}
    >
      {Image ? <Image width={width} className="lg:pr-1" /> : <div className="lg:pl-0 " />}
      <div className="flex-1 pl-4 lg:pl-0 text-current font-medium text-sm">{title}</div>
    </Link>
  );
};

export default Row;
