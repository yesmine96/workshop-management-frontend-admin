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
          <div className="py-2  ">
            <span className="font-bold">Nom de la formation: </span>
            {dataTraining?.training?.name}
          </div>
          <div className="py-2  ">
            {' '}
            <span className="font-bold">Catégorie: </span> {dataTraining?.training?.idCategory?.name}
          </div>
          <div className="py-2 ">
            <span className="font-bold">Sous-catégorie: </span> {dataTraining?.training?.idSubCategories?.name}
          </div>
          {dataTraining?.training?.description && <div className="py-2  "> {dataTraining?.training?.description}</div>}
          <div className="py-2  flex justify-between w-[80%]">
            <div>
              <div className="font-bold">Date</div>
              <span className="text-[#00458b]">Du: </span>{' '}
              {moment(dataTraining?.training?.dateStart, 'x').format('DD/MM/YYYY')}
              <span className="text-[#00458b]"> &nbsp;&nbsp; Jusqu'à: </span>{' '}
              {moment(dataTraining?.training?.dateEnd, 'x').format('DD/MM/YYYY ')}{' '}
            </div>
            <div>
              <div className="font-bold">Heure</div>
              <span className="text-[#00458b]">Du: </span>{' '}
              {moment(dataTraining?.training?.dateStart, 'x').format('HH:mm')}
              <span className="text-[#00458b]"> &nbsp; &nbsp; Au </span>{' '}
              {moment(dataTraining?.training?.dateEnd, 'x').format('HH:mm ')}{' '}
            </div>
          </div>
          <div className="py-2  ">
            <span className="font-bold">Prix</span> &nbsp;
            {dataTraining?.training?.price} dt
          </div>
        </div>
        <div className="w-[200px] m-auto">
          <img alt="qsdqsdq" className=" object-contain" src={dataTraining?.training?.image[0]} />
        </div>
      </div>
      <TableParticipationTraining id={params.id} dataProps={dataTraining?.training} />
    </div>
  );
};
export default DetailsTraining;
