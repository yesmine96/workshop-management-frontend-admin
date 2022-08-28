import List from 'components/crud/List';

import { useResponsiveTable } from 'hooks/useResponsiveTable';
import Edit from 'components/icons/Edit';
import IconContainer from 'components/ui/Route/IconContainer';

import { useEffect } from 'react';
import { useGetTrainings } from 'requests/Training/training.service';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

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
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      className: 'text-center',
      render: (_, { image }) => (
        <p className=" text-[#818181] text-[14px] max-w-xs overflow-ellipsis whitespace-nowrap overflow-hidden text-center">
          <img src={image[0]} alt="dssd" />{' '}
        </p>
      ),
    },
    {
      title: 'Prix',
      dataIndex: 'price',
      key: 'price',
      className: 'text-center',
      render: (_, { price }) => (
        <p className=" text-[#818181] text-[14px] max-w-xs overflow-ellipsis whitespace-nowrap overflow-hidden text-center">
          {price} dt
        </p>
      ),
    },
    {
      title: 'Catégorie',
      dataIndex: 'idCategory',
      key: 'idCategory',
      className: 'text-center',
      render: (_, { idCategory, idSubCategories }) => (
        <p className=" text-[#818181] text-[14px] max-w-[100px] overflow-ellipsis whitespace-nowrap overflow-hidden text-center">
          {idCategory?.name},{idSubCategories?.name}
        </p>
      ),
    },
    {
      title: 'Nombre',
      dataIndex: 'membersNumber',
      key: 'membersNumber',
      className: 'text-center',
      render: (_, { membersNumber }) => (
        <p className=" text-[#818181] text-[14px] max-w-xs overflow-ellipsis whitespace-nowrap overflow-hidden text-center">
          {membersNumber}
        </p>
      ),
    },

    {
      title: 'Date début',
      dataIndex: 'dateStart',
      key: 'dateStart',
      className: 'text-center',
      render: (_, { dateStart }) => (
        <p className=" text-[#818181] text-[14px] max-w-xs overflow-ellipsis whitespace-nowrap overflow-hidden text-center">
          {moment(dateStart, 'x').format('DD/MM/YYYY HH:mm')}{' '}
        </p>
      ),
    },
    {
      title: 'Date fin',
      dataIndex: 'dateEnd',
      key: 'dateEnd',
      className: 'text-center',
      render: (_, { dateEnd }) => (
        <p className=" text-[#818181] text-[14px] max-w-xs overflow-ellipsis whitespace-nowrap overflow-hidden text-center">
          {moment(dateEnd, 'x').format('DD/MM/YYYY HH:mm')}{' '}
        </p>
      ),
    },
  ]);

  return (
    <div className="flex flex-col justify-center gap-[24px]">
      <div
        className="w-[200px] cursor-pointer p-4 mx-3 gap-2 flex-col rounded-xl  bg-[#FAFAFA] shadow-dropdown flex justify-between items-center xl:mx-1"
        onClick={() => history.push('/addTrainig')}
      >
        Ajouter une formation
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
      />
    </div>
  );
}
