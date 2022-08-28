import Pagination, { PaginationProps } from 'components/data-display/Pagination';
import Table, { TableItem, TableProps } from 'components/data-display/Table';
import DeleteModal from 'components/Modals/DeleteModal';
import Loading from 'components/ui/Loading/Loading';
import CheckBox from 'components/ux/CheckBox';
import useTableControls from 'hooks/useTableControls';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

interface ListProps<T extends TableItem> extends TableProps<T>, PaginationProps {
  canDelete?: () => void;
  urlUpdate?: string;
  loading?: boolean;
  setSelected?: (v?: any) => void;
  selection?: boolean;
  onRowClick?: (row: T, index: number) => void;
}

const List = <T extends TableItem>({
  data,
  headers: headersProp,
  totalPages,
  currentPage,
  onPageChange,
  onRowClick,
  canDelete,
  urlUpdate,
  loading,
  setSelected,
  selection = false,
}: ListProps<T>) => {
  const router = useHistory();
  const [values, valuesChange] = useState<{ id: string; checked: boolean }[]>([]);
  function onRowCheck(e: React.ChangeEvent<HTMLInputElement>, i: number) {
    const table = [...values];
    table[i] = { ...table[i], checked: e.target.checked };
    valuesChange(table);
  }
  const [id, setId] = useState<any>();
  const [open, setOpen] = useState(false);

  const headers = [
    ...useTableControls(headersProp, data, {
      onEdit: urlUpdate ? ({ id }: any) => router.push(`/${urlUpdate}/${id}`) : undefined,
      onDelete: canDelete
        ? ({ id }: any) => {
            setOpen(true);
            setId([id]);
          }
        : undefined,

      onMultipleDelete: canDelete
        ? (ids: any) => {
            setOpen(true);
            setId(ids);
          }
        : undefined,
    }),
  ];

  selection &&
    headers.unshift({
      title: '',
      key: '__check__',
      render(value: any, row: T, i: number) {
        return (
          <CheckBox
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => onRowCheck(event, i)}
            onChecked={(v) => {
              if (setSelected) {
                if (v) {
                  setSelected((old: any) => [row, ...old]);
                } else {
                  setSelected((old: any) => old.filter((e: any) => e.id !== row?.id));
                }
              }
            }}
            className="py-3 px-1"
          />
        );
      },
    });
  return (
    <div className="p-0 flex-1 flex flex-col items-center">
      {!loading ? <Table onRowClick={onRowClick} className="flex-1" data={data} headers={headers} /> : <Loading />}

      {canDelete && (
        <DeleteModal
          deleteCall={canDelete}
          id={open ? id : []}
          msg={'aaa'}
          onClose={(updated: boolean) => {
            setOpen(false);
          }}
        />
      )}
      {!loading && totalPages !== 0 && (
        <Pagination className="pt-4" totalPages={totalPages} currentPage={currentPage} onPageChange={onPageChange} />
      )}
    </div>
  );
};

export default List;
