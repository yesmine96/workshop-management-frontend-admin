import List from 'components/crud/List';

import { useResponsiveTable } from 'hooks/useResponsiveTable';
import Edit from 'components/icons/Edit';
import { useAddTrainer, useDeleteTrainer, useGetTrainers, useUpdateTrainer } from 'requests/Trainer/trainer.service';
import IconContainer from 'components/ui/Route/IconContainer';

import { useEffect, useState } from 'react';
import { TrainerData } from 'requests/Trainer/trainer.types';
import ModalTrainer from 'components/Modals/ModalTrainer';

export default function TableTrainer() {
  const { data, refetch, loading } = useGetTrainers({ fetchPolicy: 'no-cache' });
  const [openUpdate, setopenUpdate] = useState(false);
  const [pointer, setPointer] = useState<TrainerData>();

  const [updateTrainer] = useUpdateTrainer();
  const [addTrainer] = useAddTrainer();

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handelOpenUpdateModal = async (obj?: any) => {
    setPointer(obj);

    setTimeout(() => {
      setopenUpdate(true);
    }, 1000);
  };
  const handleUpdateTrainer = (values: any) => {
    updateTrainer({ variables: { ...values, id: pointer?.id } }).then(() => {
      setopenUpdate(false);
      refetch();
    });
  };
  const handleAddTrainer = (values: any) => {
    addTrainer({ variables: values }).then(() => {
      setopenUpdate(false);
      refetch();
    });
  };
  const { responsiveTable } = useResponsiveTable([
    {
      title: 'Nom et Prènom',
      dataIndex: 'fullName',
      key: 'fullName',
      render: (_, { fullName }) => (
        <p className=" text-[#818181] text-[14px] max-w-xs overflow-ellipsis whitespace-nowrap overflow-hidden ">
          {fullName}
        </p>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      className: 'text-center',
      render: (_, { email }) => (
        <p className=" text-[#818181] text-[14px] max-w-xs overflow-ellipsis whitespace-nowrap overflow-hidden text-center">
          {email}
        </p>
      ),
    },
    {
      title: 'Telephone',
      dataIndex: 'telephone',
      key: 'telephone',
      className: 'text-center',
      render: (_, { telephone }) => (
        <p className=" text-[#818181] text-[14px] max-w-xs overflow-ellipsis whitespace-nowrap overflow-hidden text-center">
          {telephone}
        </p>
      ),
    },
    {
      title: 'Spécialité',
      dataIndex: 'speciality',
      key: 'speciality',
      className: 'text-center',
      render: (_, { speciality }) => (
        <p className=" text-[#818181] text-[14px] max-w-xs overflow-ellipsis whitespace-nowrap overflow-hidden text-center">
          {speciality?.name}
        </p>
      ),
    },
    {
      title: 'Action',
      dataIndex: 'Montant',
      key: 'total_amount',
      className: 'text-right',

      render: (value, obj) => (
        <div className="flex  items-center gap-4 text-right justify-end">
          <IconContainer
            onClick={() => handelOpenUpdateModal(obj)}
            Icon={Edit}
            className=" bg-[#EFEBF7] text-[#6237B2] hover:bg-[#EFEBF77d]"
          />
        </div>
      ),
    },
  ]);

  return (
    <div className="flex flex-col justify-center gap-[24px]">
      <div
        className="w-[200px] cursor-pointer p-4 mx-3 gap-2 flex-col rounded-xl  bg-[#FAFAFA] shadow-dropdown flex justify-between items-center xl:mx-1"
        onClick={() => handelOpenUpdateModal()}
      >
        Ajouter un formateur
      </div>
      <List<any>
        loading={loading}
        canDelete={useDeleteTrainer}
        totalPages={0}
        onPageChange={() => {}}
        currentPage={Number(/* search.page */) || 1}
        data={data?.trainers?.data || []}
        headers={responsiveTable}
      />

      <ModalTrainer
        id={pointer?.id}
        open={openUpdate}
        setOpen={setopenUpdate}
        onSubmit={(values) => {
          if (pointer?.id) {
            handleUpdateTrainer(values);
          } else handleAddTrainer(values);
        }}
      />
    </div>
  );
}
