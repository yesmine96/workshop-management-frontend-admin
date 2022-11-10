import { Header } from 'components/data-display/Table';
import Delete from 'components/icons/Delete';
import Edit from 'components/icons/Edit';
import IconContainer from 'components/ui/Route/IconContainer';
import { useEffect, useState } from 'react';

const checkboxClassName = 'h-5 w-5';

function useTableControls<T extends { id: string }>(
  headers: Header<T>[],
  data: T[],
  {
    onEdit,
    onDelete,
    onMultipleDelete,
  }: {
    onEdit?: (row: T, index: number) => void;
    onDelete?: (row: T, index: number) => void;
    onMultipleDelete?: (values: string[]) => void;
  } = {},
) {
  const [values, valuesChange] = useState<{ id: string; checked: boolean }[]>([]);

  useEffect(() => {
    valuesChange((prevValues) =>
      data.map(
        ({ id }) =>
          prevValues.find((value) => value.id === id) || {
            id,
            checked: false,
          },
      ),
    );
  }, [data]);

  function checkAll(e: React.ChangeEvent<HTMLInputElement>) {
    valuesChange(values.map(({ id }) => ({ id, checked: e.target.checked })));
  }

  function onRowCheck(e: React.ChangeEvent<HTMLInputElement>, i: number) {
    const table = [...values];
    table[i] = { ...table[i], checked: e.target.checked };
    valuesChange(table);
  }

  return [
    onMultipleDelete && {
      title: values.length ? (
        <input
          type="checkbox"
          className={checkboxClassName}
          onChange={checkAll}
          checked={values.every((value) => value.checked)}
        />
      ) : (
        ''
      ),
      key: '__check__',
      render(value: any, row: T, i: number) {
        return (
          <input
            className={checkboxClassName}
            type="checkbox"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => onRowCheck(event, i)}
            checked={values[i] ? values[i].checked : false}
          />
        );
      },
    },
    ...headers,
    (onMultipleDelete || onEdit || onDelete) && {
      title:
        onMultipleDelete && values.some((v) => v.checked) ? (
          <button
            onClick={() => onMultipleDelete(values.filter((item) => item.checked).map((item) => item.id))}
            className="bg-[#E56E1B] hover:bg-pink-700 text-white h-10 font-bold py-2 px-4 h-10 rounded focus:outline-none focus:shadow-outline"
          >
            Supprimer
          </button>
        ) : (
          ''
        ),
      key: '__controls__',
      isClickable: false,
      render: (_value: any, row: T, index: number) => {
        return (
          <div className="flex gap-3">
            {onEdit && (
              <IconContainer
                onClick={() => onEdit(row, index)}
                Icon={Edit}
                className=" bg-[#EFEBF7] text-[#6237B2] hover:bg-[#EFEBF77d]"
              />
            )}
            {onDelete && (
              <IconContainer
                onClick={() => onDelete(row, index)}
                Icon={Delete}
                className=" bg-[#EFEBF7] hover:!bg-[#EFEBF77d]"
              />
            )}
          </div>
        );
      },
    },
  ].filter(Boolean) as Header<T>[];
}

export default useTableControls;
