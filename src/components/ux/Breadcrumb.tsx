/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

import ArrowRight from "components/icons/ArrowRight";
import { useHistory } from 'react-router-dom';



interface Props {
  previousPage: {
    title: string;
    link?: string;
  }[];

  currentPage: string;
}


const Breadcrumbs = ({ currentPage, previousPage }: Props) => {
    const history = useHistory();

  return (
    <div className="flex text-22 text-blue font-CalibreSemiBold pt-6 pl-8 ">
      {previousPage.map((item) => (
        <>
          <p
            className={`text-sm ${item.link && 'underline  cursor-pointer hover:text-blue-100'} `}
            onClick={() => (item?.link ? history.push(item?.link) : null)}
          >
            {item.title}
          </p>
          {currentPage &&  <ArrowRight className="pb-2 mx-4" width="10px" />}
        </>
      ))}
      <div className="text-sm">{currentPage}</div>
    </div>
  );
};
export default Breadcrumbs;
