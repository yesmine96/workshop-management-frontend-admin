import { FunctionComponent } from 'react';
import { Medicine } from 'requests/trainings';

export type CounterProps = {
  data: Medicine[];
};

const Counter: FunctionComponent<CounterProps> = ({ data, ...rest }) => {
  return (
    <div className="flex flex-col justify-center items-end w-full" {...rest}>
      {data?.length <= 1 ? (
        <div className="text-xs	">
          {' '}
          <span className=" text-green font-semibold"> {data?.length}</span>{' '}
          <span className="text-blue-600 font-sans">Résultat trouvé </span>
        </div>
      ) : (
        <div className="text-xs	">
          {' '}
          <span className="font-semibold text-yellow"> {data?.length} </span>{' '}
          <span className=" font-sans text-blue-600"> Résultats trouvés </span>
        </div>
      )}
    </div>
  );
};

export default Counter;
