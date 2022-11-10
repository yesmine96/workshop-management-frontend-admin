import List from 'components/crud/List';

import { useResponsiveTable } from 'hooks/useResponsiveTable';

import { useEffect } from 'react';
import { useGetTrainings } from 'requests/Training/training.service';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { useDeleteTrainer } from 'requests/Trainer/trainer.service';
import Search from 'components/ux/Search';

export default function Training() {
  const { data, refetch, loading } = useGetTrainings({ fetchPolicy: 'no-cache' });
  const history = useHistory();

  useEffect(() => {
    refetch();
  }, [refetch]);

  const { responsiveTable } = useResponsiveTable([
    {
      title: 'Nom',
      dataIndex: 'name',
      key: 'name',
      render: (_, { name }) => (
        <p className=" text-[#818181] text-[14px] max-w-xs overflow-ellipsis whitespace-nowrap overflow-hidden ">
          {name}
        </p>
      ),
    },
    {
      title: 'Formateur',
      dataIndex: 'Formateur',
      key: 'image',

      render: (_, { idTrainer }) => (
        <p className=" text-[#818181] text-[14px] max-w-xs overflow-ellipsis whitespace-nowrap overflow-hidden ">
          {idTrainer.fullName}
          {/* <img src={image[0]} alt="dssd" className="w-[70px]" /> */}
        </p>
      ),
    },
    {
      title: 'Prix',
      dataIndex: 'price',
      key: 'price',

      render: (_, { price }) => (
        <p className=" text-[#818181] text-[14px] max-w-xs overflow-ellipsis whitespace-nowrap overflow-hidden ">
          {price} dt
        </p>
      ),
    },
    {
      title: 'Catégorie',
      dataIndex: 'idCategory',
      key: 'idCategory',

      render: (_, { idCategory, idSubCategories }) => (
        <p className=" text-[#818181] text-[14px] max-w-[100px] overflow-ellipsis whitespace-nowrap overflow-hidden ">
          {idCategory?.name},{idSubCategories?.name}
        </p>
      ),
    },
    {
      title: 'Nombre',
      dataIndex: 'membersNumber',
      key: 'membersNumber',

      render: (_, { membersNumber }) => (
        <p className=" text-[#818181] text-[14px] max-w-xs overflow-ellipsis whitespace-nowrap overflow-hidden ">
          {membersNumber}
        </p>
      ),
    },

    {
      title: 'Date début',
      dataIndex: 'dateStart',
      key: 'dateStart',

      render: (_, { dateStart }) => (
        <p className=" text-[#818181] text-[14px] max-w-xs overflow-ellipsis whitespace-nowrap overflow-hidden ">
          {moment(dateStart, 'x').format('DD/MM/YYYY')}{' '}
        </p>
      ),
    },
    {
      title: 'Date fin',
      dataIndex: 'dateEnd',
      key: 'dateEnd',

      render: (_, { dateEnd }) => (
        <p className=" text-[#818181] text-[14px] max-w-xs overflow-ellipsis whitespace-nowrap overflow-hidden ">
          {moment(dateEnd, 'x').format('DD/MM/YYYY')}{' '}
        </p>
      ),
    },
  ]);

  return (
    <div className="flex flex-col justify-center gap-[24px]">
      <div>
        <h1 className="font-medium text-[30px] ">Gestion des formations</h1>
      </div>
      <div className="flex justify-between">
        <div
          className="w-[200px] cursor-pointer p-4 mr-3 gap-2 flex-col rounded-xl  bg-[#FAFAFA] shadow-dropdown flex justify-between items-center xl:mx-1"
          onClick={() => history.push('/addTrainig')}
        >
          Ajouter une formation
        </div>
        <Search inputClasses="!min-w-[100%]   pl-[56px]" onSearch={() => {}} />
      </div>
      <List<any>
        urlUpdate="addTrainig"
        loading={loading}
        totalPages={0}
        onPageChange={() => {}}
        currentPage={Number(/* search.page */) || 1}
        data={data?.trainings?.data || []}
        headers={responsiveTable}
        onRowClick={(obj) => {
          history.push(`/DetailsTraining/${obj.id}`);
        }}
        canDelete={useDeleteTrainer}
      />
    </div>
  );
}
