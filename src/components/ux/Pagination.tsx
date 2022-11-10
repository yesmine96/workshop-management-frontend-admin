import { useEffect, useState } from 'react';
import classNames from 'utils/classNames';

import ArrowLeft from '../icons/ArrowPreviousLeft';
import ArrowRight from '../icons/ArrowNextRight';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const pages = [];

  const [NUMBER_OF_PAGES, setPaginationPages] = useState(5);
  const updatePage = () => {
    if (window.innerWidth < 625) {
      setPaginationPages(3);
    }
  };
  useEffect(() => {
    window.addEventListener('resize', updatePage);
    return () => {
      window.removeEventListener('resize', updatePage);
    };
  }, []);

  if (totalPages <= NUMBER_OF_PAGES) {
    for (let i = 1; i <= totalPages; i += 1) {
      pages.push(i);
    }
  } else {
    let leftSide = Math.ceil(NUMBER_OF_PAGES / 2);
    let rightSide = NUMBER_OF_PAGES - leftSide;

    if (currentPage > totalPages - Math.trunc(NUMBER_OF_PAGES / 2)) {
      rightSide = totalPages - currentPage;
      leftSide = NUMBER_OF_PAGES - rightSide;
    } else if (currentPage < leftSide) {
      leftSide = currentPage;
      rightSide = NUMBER_OF_PAGES - leftSide;
    }
    for (let i = leftSide - 1; i >= 0; i -= 1) {
      pages.push(currentPage - i);
    }
    for (let i = 1; i <= rightSide; i += 1) {
      pages.push(currentPage + i);
    }
  }

  const renderPage = (page: number) => {
    function onClick() {
      if (page !== currentPage) {
        onPageChange(page);
      }
    }

    return (
      <div
        onClick={onClick}
        key={page}
        className={classNames(
          'flex flex-row justify-center items-center rounded-5 mr-2 cursor-pointer text-base 2xl:text-xs font-medium',
          'h-10 w-10 2xl:h-9 2xl:w-9 ',
          currentPage === page ? 'bg-blue text-white' : 'bg-white text-blue-600',
        )}
      >
        {page}
      </div>
    );
  };

  const RenderArrow = (direction: 'left' | 'right') => {
    function onClick() {
      if ((currentPage !== 1 && direction === 'left') || (currentPage !== totalPages && direction === 'right')) {
        const nextPage = direction === 'left' ? currentPage - 1 : currentPage + 1;
        onPageChange(nextPage);
      }
    }

    return (
      <span onClick={onClick}>
        {direction === 'left' ? (
          <ArrowLeft fill="#111136" width="10px" className="mr-2.5 cursor-pointer" />
        ) : (
          <ArrowRight fill="#111136" width="10px" className="ml-2.5  cursor-pointer" />
        )}
      </span>
    );
  };

  if (totalPages === 1) return null;

  return (
    <>
      {currentPage > 0 ? (
        <div className="w-full flex flex-row justify-center items-center">
          <div
            className={classNames(
              'mr-5 text-sm font-regular cursor-pointer ',
              currentPage > 1 ? 'text-blue' : ' text-blue-600 cursor-default',
            )}
            onClick={() => onPageChange(1)}
          >
            Première page
          </div>

          {totalPages > 1 && currentPage > 1 ? (
            RenderArrow('left')
          ) : (
            <ArrowLeft fill="#C2CAD1" width="10px" className="mr-2.5  cursor-pointer" />
          )}
          <div className="flex flex-row justify-center items-center">{pages.map(renderPage)}</div>
          {totalPages > 1 && currentPage < totalPages ? (
            RenderArrow('right')
          ) : (
            <ArrowRight fill="#C2CAD1" width="10px" className="ml-2.5 hover:fill-blue cursor-pointer" />
          )}
          <div
            className={classNames(
              'ml-5 text-sm cursor-pointer font-regular ',
              currentPage === totalPages ? 'text-blue-600 cursor-default' : 'text-blue',
            )}
            onClick={() => onPageChange(totalPages)}
          >
            Dernière page
          </div>
        </div>
      ) : (
        <div />
      )}
    </>
  );
};

export default Pagination;
