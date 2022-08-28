import moment from 'moment';
import { useParams } from 'react-router-dom';
import { useGetTraining } from 'requests/Training/training.service';
import TableParticipationTraining from './TableParticipationTraining';

const DetailsTraining = () => {
  const params = useParams<{ id: string }>();
  const { data: dataTraining } = useGetTraining({
    variables: { id: params.id },
    fetchPolicy: 'no-cache',
  });
  return (
    <div>
      <div className="flex shadow-dropdown  rounded-xl bg-gray-200 p-4 ml-2 ">
        <div className="flex flex-col justify-between w-full">
          <div className="py-2  "> {dataTraining?.training?.name}</div>
          <div className="py-2  ">
            {' '}
            {dataTraining?.training?.idCategory?.name},{dataTraining?.training?.idSubCategories?.name}
          </div>
          <div className="py-2  "> {dataTraining?.training?.description}</div>
          <div className="py-2  ">
            Du {moment(dataTraining?.training?.dateStart, 'x').format('DD/MM/YYYY HH:mm')} Au{' '}
            {moment(dataTraining?.training?.dateStart, 'x').format('DD/MM/YYYY HH:mm')}{' '}
          </div>
          <div className="py-2  ">
            Prix
            {dataTraining?.training?.price}
          </div>
        </div>
        <div className="w-[200px] m-auto">
          <img alt="qsdqsdq" className=" object-contain" src={dataTraining?.training?.image[0]} />
        </div>
      </div>
      <TableParticipationTraining id={params.id} />
    </div>
  );
};
export default DetailsTraining;
