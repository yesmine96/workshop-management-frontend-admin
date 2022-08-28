import List from 'components/crud/List';

import { useResponsiveTable } from 'hooks/useResponsiveTable';
import { useEffect } from 'react';
import { useGetClientParticipated } from 'requests/TrainingParticipation/trainingParticipation.service';
interface Props {
  id?: string;
}
export default function TableParticipationTraining({ id }: Props) {
  const { data, refetch, loading } = useGetClientParticipated({
    variables: { idTraining: id },
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  const { responsiveTable } = useResponsiveTable([
    {
      title: 'Nom et Prènom',
      dataIndex: 'fullName',
      key: 'fullName',
      render: (_, { idClient }) => (
        <p className=" text-[#818181] text-[18px] max-w-xs overflow-ellipsis whitespace-nowrap overflow-hidden ">
          {idClient?.fullName}
        </p>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      className: 'text-center',
      render: (_, { idClient }) => (
        <p className=" text-[#818181] text-[18px] max-w-xs overflow-ellipsis whitespace-nowrap overflow-hidden text-center">
          {idClient?.email}
        </p>
      ),
    },
    {
      title: 'Telephone',
      dataIndex: 'telephone',
      key: 'telephone',
      className: 'text-center',
      render: (_, { idClient }) => (
        <p className=" text-[#818181] text-[18px] max-w-xs overflow-ellipsis whitespace-nowrap overflow-hidden text-center">
          {idClient?.telephone}
        </p>
      ),
    },
    {
      title: 'Montant total payé ',
      dataIndex: 'speciality',
      key: 'speciality',
      className: 'text-center',
      render: (_, { valid }) => (
        <p className=" text-[#818181] text-[18px] max-w-xs overflow-ellipsis whitespace-nowrap overflow-hidden text-center">
          {valid}
        </p>
      ),
    },
  ]);

  return (
    <div className="flex flex-col justify-center gap-[24px] mt-8">
      <List<any>
        loading={loading}
        totalPages={0}
        onPageChange={() => {}}
        currentPage={Number(/* search.page */) || 1}
        data={data?.getClientParticipated?.data || []}
        headers={responsiveTable}
      />
    </div>
  );
}
