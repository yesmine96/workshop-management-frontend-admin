import {  useLocation,Link } from 'react-router-dom';
import classNames from 'utils/classNames';
import { decodeUri, encodeUri } from 'utils/url';

interface Props {
  data: any;
  title?: string;
  type?: string;
  pathname?: string;
  array?: boolean;
  count?: boolean;
  className?: string;
  search?: boolean;
}

const MedecineMenu: React.FC<Props> = ({ data, title,  className }) => {
  const location = useLocation();
  const uri = decodeUri(location.search);

  return (
    <div className="pl-6 py-6 flex flex-col bg-white " style={{ height: 'fit-content' }}>
{ title&&     <div className="text-blue-600 font-semibold text-base pb-1.5 self-start">
        {title}
        <div className="border-t-2 border-grey w-full" />
      </div>}
      <div
        className={classNames(
          'capitalize grid grid-flow-col grid-rows-5 gap-x-9 font-medium font-sans text-sm ',
          className,
        )}
      >
        {data
         ?.map((e: any) =>
              <Link key={e.id}to= {{ pathname: '/', search: uri.idCat===e.idCategory.id ? encodeUri({...uri,idSubCat: `${e.id}` }): encodeUri({idCat:`${e?.idCategory.id}`,idSubCat: `${e.id}` }
        )
           } }className="flex py-1.5">
           <div
                  className={classNames(
                    ` truncate hover:text-green  ${location.search?.includes(`idSubCat=${e.id}`) && 'text-green'}`,
                  )}

                  
                
                >
                  {e.name?.split('®').map((name: any, index: number, tab: any) => (
                    <>
                      {name}
                      {tab.length > 1 && index !== tab.length - 1 && <span className="text-2xl">®</span>}
                    </>
                  ))}
                </div>
             </Link>
            
          )}
      </div>
    </div>
  );
};

export default MedecineMenu;
