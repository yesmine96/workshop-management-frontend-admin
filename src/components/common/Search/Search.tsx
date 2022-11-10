import Cancel from 'components/icons/Cancel';
import Search from 'components/icons/Search';
import classNames from 'utils/classNames';
import Input from 'components/ux/Input';
import React, { useRef, useState } from 'react';
import { Link,  } from 'react-router-dom';
import { Spinner } from 'utils/loading';
import { useMedicine } from 'requests/trainings';
import { encodeUri } from 'utils/url';
import DropDown from '../DropDown/DropDown';

interface SearchProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  className?: string;
  id?: string;
}
const SearchComponent: React.FC<SearchProps> = ({ className, id }) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
 

  // const { data: resultSearch, loading } = useGeneralSearch({
  //   variables: { name: search },
  //   fetchPolicy: 'no-cache',
  //   nextFetchPolicy: 'no-cache',
  // });
  const { data: resultSearch, loading }  = useMedicine({
    fetchPolicy: 'no-cache',
    variables: {
   
      name:search

    },

  });
  function renderTitle(title: string) {
    return <div className="pl-8 2xl:pl-4 py-2 text-base text-blue-600 font-semibold bg-grey-400">{title}</div>;
  }

  const divRef = useRef<HTMLDivElement>(null);
  function renderMedecine() {
    const elements = [
   
      resultSearch?.trainings.data.length && (
        <React.Fragment key={2}>
          {renderTitle('Formations')}
          <div className="bg-grey-200 ">
            {resultSearch?.trainings.data
              ?.slice()
              ?.sort((a:any, b:any) => a.name.localeCompare(b.name, 'es', { sensitivity: 'base' }))
              .map((d:any) => (
                <Link key={d.id} to={{ pathname: '/', search: encodeUri({ name:d.name }) }}>
                  <div className="hover:text-blue-750 hover:bg-white cursor-pointer pt-3 pb-3">
                    <div className="w-11/12 m-auto capitalize">{d.name}</div>
                  </div>
                </Link>
              ))}
          </div>
        </React.Fragment>
      ),
 
    ].filter((e) => e);

    if (elements.length) return elements;
    return <div className="items-center pt-3 pb-3 text-grey-600 w-11/12 m-auto capitalize">Aucun résultat trouvé</div>;
  }
  return (
    <div id={id} className={classNames(' h-28 flex justify-center items-center gap-6', className)}>
      <div ref={divRef} className="w-536">
        <Input
          placeholder="Moteur de recherche"
          onChange={(e) => {
            setOpen(true);
            setSearch(e.target.value);
          }}
          handleError={false}
          iconRight={
            <Cancel
              width={24}
              onClick={() => {
                setSearch('');
                setOpen(false);
              }}
            />
          }
          iconLeft={<Search width={18} />}
          value={search}
        />
      </div>
      <DropDown
        full
        onClose={() => setOpen(false)}
        top={10}
        className="rounded-5 max-h-96 overflow-auto"
        anchorEl={divRef}
        open={open}
      >
        {loading ? <Spinner name="line-scale-pulse-out-rapid" color="#1466ff" /> : renderMedecine()}
      </DropDown>
    </div>
  );
};
export default SearchComponent;
