import classNames from 'utils/classNames';

const Page: React.FC<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <div className={classNames('flex-1 px-36 2xl:px-26', className)} {...rest}>
      {children}
    </div>
  );
};

export default Page;
