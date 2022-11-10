import classNames from 'utils/classNames';

interface RowProps {
  title: string;
  className?: string;
}

const Row: React.FC<RowProps> = ({ title, className }) => {
  return <div className={classNames('font-semibold text-lg text-blue-450  2xl:text-base', className)}>{title}</div>;
};

export default Row;
