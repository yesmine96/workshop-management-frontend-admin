import Input from 'components/ux/Input';
import { useEffect, useState } from 'react';
import classNames from 'utils/classNames';

export interface TableItem {
  id: string;
  isClickable?: boolean;
}

export interface Header<T extends TableItem> {
  title: string | JSX.Element;
  key: string;
  className?: string;
  filter?: boolean;
  dataIndex?: keyof T;
  render?: (value: any, record: T, index: number) => JSX.Element | string | null;
  isClickable?: boolean;
}

export interface TableProps<T extends TableItem> {
  headers: Header<T>[];
  data: T[];
  emptyComponent?: JSX.Element | string;
  onRowClick?: (row: T, index: number) => void;
  className?: string;
  isClickable?: boolean;
}

const Table = <T extends TableItem>({
  headers,
  data,
  emptyComponent = 'No data to display',
  onRowClick,
  className,
}: TableProps<T>) => {
  const [DATA, setDATA] = useState([]);

  useEffect(() => {
    setDATA(DATA);
  }, [data]);

  if (data?.length === 0) return <div>{emptyComponent}</div>;
  return (
    <div className={classNames('flex flex-col w-full ', className)}>
      <div className="-my-2 overflow-x-auto sm:-mx-6  rounded-2xl ">
        <div
          style={{ minWidth: 'calc( 100% - 13px )' }}
          className="  align-middle inline-block min-w-[calc( 100% - 13px )]   rounded-2xl !bg-[#FAFAFA] shadow-dropdown "
        >
          <div className=" overflow-hidden border-b border-gray-200 sm:rounded-2xl   rounded-2xl">
            <table
              style={{ minWidth: 'calc( 100% - 13px )' }}
              className="min-w-[calc( 100% - 13px )] divide-y divide-gray-200  rounded-2xl overflow-x-auto   "
            >
              <thead className="bg-[transparent] h-16">
                <tr className="bg-">
                  {headers.map((header) => (
                    <th
                      key={header.key}
                      scope="col"
                      className={`px-2 py-3 text-left text-sm font-bold text-[#818181] font-PopinsMedium tracking-wider bg-[transparent] ${header.className}`}
                    >
                      <div>
                        {header?.filter ? (
                          <div className="flex flex-col gap-3 ">
                            <div>{header.title}</div>
                            <Input />
                          </div>
                        ) : (
                          <>{header.title}</>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-[transparent] divide-y divide-gray-200">
                {data?.map((row, i) => (
                  <tr
                    className="hover:bg-[#90899e40] ease-in-out cursor-pointer duration-200"
                    style={{ background: `${i % 2 && '#90899e40'}` }}
                    key={row.id}
                  >
                    {headers.map(({ isClickable = true, ...header }) => {
                      let value: any = header.dataIndex ? row[header.dataIndex] : null;
                      if (header.render) {
                        value = header.render(value, row, i);
                      }

                      return (
                        <td
                          key={header.key}
                          className="px-2 py-2 font-PopinsMedium"
                          onClick={() => {
                            if (onRowClick && isClickable) onRowClick(row, i);
                          }}
                        >
                          {value}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
