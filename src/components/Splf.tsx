import { FunctionComponent } from 'react';
import splf from 'assets/png/splfCard.png';

interface CardProps {
  colorType?: boolean;
}
const Splf: FunctionComponent<CardProps> = ({ colorType }) => {
  return (
    <div
      className={`w-full flex flex-col  items-center flex-1 ${
        !colorType ? 'bg-white border border-grey' : ''
      } rounded border-gray-900 py-4`}
    >
      <img src={splf} alt="splf" width={70} />
      <div className="text-xs text-blue-600 mb-25 font-semibold  w-9/12">
        Guide Alizé est une marque déposée par la SPLF
      </div>
      <div className="font-regular text-justify text-xs text-blue-600 flex flex-col w-10/12">
        <span className="mb-25 text-xs">
          « En accord avec l’ANSM, cet outil éducationnel ne s’inscrit pas dans une démarche promotionnelle des
          laboratoires pharmaceutiques concernés. »{' '}
        </span>
        <span className="text-xs flex flex-col">
          « Pour protéger l’environnement, il est important de rapporter les inhalateurs en pharmacie, vides ou non,
          pour leur recyclage.
          <span>Recyclage des dispositifs en pharmacie par la collecte agréée CYCLAMED. »</span>
        </span>
      </div>
    </div>
  );
};

export default Splf;
