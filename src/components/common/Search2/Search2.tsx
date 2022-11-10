import Search from 'components/icons/Search';
import Cancel from 'components/icons/Cancel';
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { useGeneralSearch } from 'requests/trainings';

import { encodeUri } from 'utils/url';
import classNames from 'utils/classNames';
import { Spinner } from 'utils/loading';

import DropDown from '../DropDown/DropDown';

import classes from './Search2.module.scss';

export default function Search2() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [focusedSearch, setfocusedSearch] = useState(false);

  const { data: resultSearch, loading } = useGeneralSearch({
    variables: { name: search },
    fetchPolicy: 'no-cache',
    nextFetchPolicy: 'no-cache',
  });

  const divRef = useRef<HTMLDivElement>(null);
  function renderTitle(title: string) {
    return <div className="pl-6 2xl:pl-4 py-2 text-base text-blue-600 font-semibold bg-grey-400">{title}</div>;
  }

  function renderMedecine() {
    const elements = [
      resultSearch?.generalSearch?.trainings?.length && (
        <React.Fragment key={1}>
          {renderTitle('Médicaments')}
          <div className="bg-grey-200">
            {resultSearch?.generalSearch.trainings
              ?.slice()
              ?.sort((a, b) => a.name.localeCompare(b.name, 'es', { sensitivity: 'base' }))
              ?.map((d) => (
                <Link key={d.id} to={`/training/${d.id}?from=home`}>
                  <div className="hover:text-blue-750 hover:bg-white  cursor-pointer pt-3 pb-3">
                    <div className="px-6 capitalize">
                      {d.name} {false && <span className="text-grey-700">()</span>}
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </React.Fragment>
      ),
      resultSearch?.generalSearch?.classes.length && (
        <React.Fragment key={2}>
          {renderTitle('Classes thérapeutiques')}
          <div className="bg-grey-200 ">
            {resultSearch?.generalSearch?.classes
              ?.slice()
              ?.sort((a, b) => a.name.localeCompare(b.name, 'es', { sensitivity: 'base' }))
              .map((d) => (
                <Link key={d.id} to={{ pathname: '/classes', search: encodeUri({ classe: d.id }) }}>
                  <div className="hover:text-blue-750 cursor-pointer pt-3 pb-3">
                    <div className="px-6 capitalize">{d.name}</div>
                  </div>
                </Link>
              ))}
          </div>
        </React.Fragment>
      ),
      resultSearch?.generalSearch?.dcis?.length && (
        <React.Fragment key={2}>
          {renderTitle('DCI')}
          <div className="bg-grey-200 ">
            {resultSearch?.generalSearch?.dcis
              ?.slice()
              ?.sort((a, b) => a.name.localeCompare(b.name, 'es', { sensitivity: 'base' }))
              ?.map((d) => (
                <Link key={d.id} to={{ pathname: '/dci', search: encodeUri({ dci: d.id }) }}>
                  <div className="hover:text-blue-750 cursor-pointer pt-3 pb-3">
                    <div className="px-6 capitalize">{d.name}</div>
                  </div>
                </Link>
              ))}
          </div>
        </React.Fragment>
      ),
    ].filter((e) => e);

    if (elements.length) return elements;
    return <div className="items-center pt-3 pb-3 text-grey-600 px-6 capitalize">Aucun résultat trouvé</div>;
  }
  return (
    <div className="">
      <div ref={divRef} className={classNames('search_box', classes.search_box)}>
        <button
          onClick={() => setfocusedSearch(!focusedSearch)}
          className={classNames(
            'btn_search flex items-center justify-center',
            classes.btn_search,
            focusedSearch && classes.btn_search_focused,
          )}
        >
          {open ? (
            <Cancel
              width={24}
              onClick={() => {
                setSearch('');
                setOpen(false);
              }}
            />
          ) : (
            <>
              {focusedSearch ? (
                <Cancel
                  width={24}
                  onClick={() => {
                    setfocusedSearch(false);
                    setSearch('');
                    setOpen(false);
                  }}
                  fill="#00a1a2"
                />
              ) : (
                <Search className="iconn" width={15} fill="#111136" />
              )}
            </>
          )}
        </button>
        <input
          value={search}
          onChange={(e) => {
            setOpen(true);
            setSearch(e.target.value);
          }}
          type="text"
          className={classNames('input_search', classes.input_search, focusedSearch && classes.input_search_focused)}
          placeholder="Type to Search..."
        />
      </div>
      <DropDown
        screen
        onClose={() => setOpen(false)}
        top={20}
        className="rounded-5 max-h-96 overflow-auto w-full"
        anchorEl={divRef}
        open={open}
      >
        {loading ? (
          <Spinner name="line-scale-pulse-out-rapid" color="#00a1a2" className="flex justify-center items-center p-5" />
        ) : (
          renderMedecine()
        )}
      </DropDown>
    </div>
  );
}
