import List from 'components/crud/List';
import Toggle from 'components/ux/toogle';

import { useResponsiveTable } from 'hooks/useResponsiveTable';
import JsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import pdf from 'assets/png/pdf.jpg';

import { useEffect } from 'react';
import { useUpdateClient } from 'requests/Client/client.service';
import { useGetClientParticipated } from 'requests/TrainingParticipation/trainingParticipation.service';
import moment from 'moment';
interface Props {
  id?: string;
  dataProps?: any;
}
export default function TableParticipationTraining({ id, dataProps }: Props) {
  const [updateClient] = useUpdateClient();

  const { data, refetch, loading } = useGetClientParticipated({
    variables: { idTraining: id },
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  const result = data?.getClientParticipated?.data
    .filter((client) => client.valid === true)
    .map((item) => {
      const newTab: any = [item.idClient?.fullName, item?.idClient?.email, item?.idClient?.telephone];
      return newTab;
    });

  console.log(result, 'outp');
  const handleExportWithComponent = () => {
    const doc = new JsPDF({
      orientation: 'l', // landscape
      unit: 'pt', // points, pixels won't work properly
    });
    const totalPagesExp = '{total_pages_count_string}';

    (doc as JsPDF & { autoTable: any }).autoTable({
      styles: { halign: 'center', valign: 'middle' },
      headStyles: { fillColor: '#fa4c07' },
      head: [['Nom et Prènom', 'Email', 'Numéro de téléphone']],
      body: result,
      showHead: 'everyPage',
      margin: { top: 110 },
      didDrawPage: (dataPdf: any) => {
        doc.setFontSize(20);
        const pageWidth = doc.internal.pageSize.width;
        const title = 'Liste des participants ';
        const txtWidth = (doc.getStringUnitWidth(title) * 20) / doc.internal.scaleFactor;
        const x = (pageWidth - txtWidth) / 2;
        doc.setTextColor(19, 31, 42);
        doc.text(title, x, 30);
        doc.setFontSize(15);
        doc.text('Nom de la formation:', 40, 90);

        doc.setFontSize(12);

        doc.text(dataProps.name, 180, 90);
        doc.setFontSize(15);
        doc.text('Date:', 360, 90);
        doc.setFontSize(12);

        doc.text(moment(dataProps?.dateStart, 'x').format('DD/MM/YYYY'), 400, 90);

        doc.text('-', 470, 90);
        doc.text(moment(dataProps?.dateEnd, 'x').format('DD/MM/YYYY'), 480, 90);
        doc.setFontSize(15);
        doc.text('Heure:', 650, 90);
        doc.setFontSize(12);

        doc.text(moment(dataProps?.dateStart, 'x').format('HH:mm'), 700, 90);
        doc.text('-', 740, 90);

        doc.text(moment(dataProps?.dateEnd, 'x').format('HH:mm'), 750, 90);

        const str = `Page ${doc.getNumberOfPages()}/${totalPagesExp}`;
        doc.setFontSize(12);
        const { pageSize } = doc.internal;
        const pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
        doc.text(str, dataPdf.settings.margin.left, pageHeight - 10);
      },
    });
    if (typeof doc.putTotalPages === 'function') {
      doc.putTotalPages(totalPagesExp);
    }
    autoTable(doc, { html: 'content-22' });
    doc.save('Liste des participants.pdf');
  };
  const { responsiveTable } = useResponsiveTable([
    {
      title: 'Nom et Prènom',
      dataIndex: 'fullName',
      key: 'fullName',
      render: (_, { idClient }) => (
        <p className=" text-[#818181] text-[14px] max-w-xs overflow-ellipsis whitespace-nowrap overflow-hidden ">
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
        <p className=" text-[#818181] text-[14px] max-w-xs overflow-ellipsis whitespace-nowrap overflow-hidden text-center">
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
        <p className=" text-[#818181] text-[14px] max-w-xs overflow-ellipsis whitespace-nowrap overflow-hidden text-center">
          {idClient?.telephone}
        </p>
      ),
    },
    {
      title: 'Montant total payé ',
      dataIndex: 'totalAmountPaid',
      key: 'totalAmountPaid',
      className: 'text-center',
      render: (_, { idClient }) => (
        <p className=" text-[#818181] text-[14px] max-w-xs overflow-ellipsis whitespace-nowrap overflow-hidden text-center">
          {idClient?.totalAmountPaid} dt
        </p>
      ),
    },
    {
      title: 'Etat',
      dataIndex: 'valid',
      key: 'valid',
      className: 'text-center',
      render: (_, { idClient, valid }) => (
        <Toggle
          active={valid}
          onlyActive
          onChange={() => updateClient({ variables: { id: idClient.id, idTraining: id, valid: true } })}
        />
      ),
    },
  ]);
  return (
    <div className="flex flex-col justify-center gap-[24px] mt-8">
      <div className="flex justify-between items-center pr-2">
        <h1 className="font-medium text-[20px] ">Liste des participants</h1>
        <div onClick={handleExportWithComponent}>
          <img src={pdf} alt="" className="w-[60px]" />
        </div>
      </div>
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
