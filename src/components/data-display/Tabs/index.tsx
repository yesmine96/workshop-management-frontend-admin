import React from 'react';
import classNames from 'utils/classNames';

interface ITabsProps {
  list: {
    label: string | React.ReactElement<any>;
    action: () => void;
    icon: React.ReactElement<any, any>;
    isActivated?: boolean;
    dontShow?: boolean;
  }[];
}
export default function Tabs({ list }: ITabsProps) {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700">
      <ul className="flex flex-wrap -mb-px">
        {list.map(({ label, icon, isActivated, action, dontShow }) => {
          if (dontShow) return null;
          return (
            <li key={`${label}`} className="mr-2">
              <span
                onClick={action}
                className={classNames(
                  isActivated && 'text-blue-600',
                  !isActivated && 'cursor-pointer hover:text-gray-600 hover:border-gray-300 ',
                  'inline-flex py-4 px-4 text-sm font-medium text-center text-gray-500 rounded-t-lg border-b-2 border-transparent dark:text-gray-400 dark:hover:text-gray-300 group',
                )}
              >
                {icon && icon}
                {label}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
