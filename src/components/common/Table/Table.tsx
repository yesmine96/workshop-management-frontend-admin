import React from 'react';

function objectValues<T extends {}>(obj: T) {
  return Object.keys(obj).map((objKey) => obj[objKey as keyof T]);
}

function objectKeys<T extends {}>(obj: T) {
  return Object.keys(obj).map((objKey) => objKey as keyof T);
}

type PrimitiveType = string | number | boolean | symbol;
function isPrimitive(value: any): value is PrimitiveType {
  return (
    typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean' || typeof value === 'symbol'
  );
}

interface MinTableItem {
  id: PrimitiveType;
}

type TableHeaders<T extends MinTableItem> = Record<keyof T, any>;

interface TableProps<T extends MinTableItem> {
  items: T[];
  headers: TableHeaders<T>;
}

export default function Table<T extends MinTableItem>({ items, headers }: TableProps<T>) {
  function renderRow(item: T) {
    return (
      <tr>
        {objectKeys(item).map((itemProperty) => {
          return typeof item[itemProperty] === 'number' ? (
            <td
              className="text-right border border-grey-550 sm:font-semibold md:font-semibold lg:font-semibold italic sm:text-10 md:text-10 
            lg:text-10 px-2 sm:px-0 md:px-0 lg:px-0 h-28 w-20"
            >
              {isPrimitive(item[itemProperty]) ? item[itemProperty] : ''}
            </td>
          ) : (
            <td
              className="border border-grey-550 text-center sm:font-semibold md:font-semibold  lg:font-semibold italic sm:text-10 md:text-10 
            lg:text-12 px-2 sm:px-0 md:px-0  lg:px-0 h-28 w-40"
            >
              {isPrimitive(item[itemProperty]) ? item[itemProperty] : ''}
            </td>
          );
        })}
      </tr>
    );
  }

  return (
    <>
      <table>
        <thead>
          {objectValues(headers)?.map((headerValue) => (
            <td className="bg-green sm:h-52 md:h-56 lg:h-56 border  border-white ">
              <div
                className=" bg-green font-semibold italic sm:whitespace-pre md:whitespace-pre	lg:whitespace-pre	
                transform sm:rotate-270 md:rotate-270 lg:rotate-270  sm:w-16 md:w-16 lg:w-16 xl:w-52 2xl:w-56 w-72 xl1_5:w-56
                sm:mt-32  sm:text-xs md:mt-32 lg:mt-32  sm:ml-1 md:ml-8 lg:ml-8
                md:text-xs  text-sm text-white  text-center px-2 sm:px-0 "
              >
                {headerValue}
              </div>
            </td>
          ))}
        </thead>

        <tbody className="bg-white">
          {items?.map(renderRow)}
          <tr>
            {objectKeys(items).map((itemProperty) => {
              return <td>{isPrimitive(items[itemProperty]) ? items[itemProperty] : ''}</td>;
            })}
          </tr>
        </tbody>
      </table>
    </>
  );
}
