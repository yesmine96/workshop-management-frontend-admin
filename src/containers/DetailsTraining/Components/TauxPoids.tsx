import Button from 'components/Button';
import ImagePreview from 'components/common/PreviewImage/ImagePreview';
import GuideSelect from 'components/filtres/Select/GuideSelect';
import React, { useState } from 'react';
import classNames from 'utils/classNames';
import classes from './Header.module.scss';

export default function TauxPoids() {
  const [poid, setPoid] = useState('');
  const [taux, settaux] = useState('');
  const [resultat, setresultat] = useState<{ value: number | undefined; dose?: number }>();
  const [error, seterror] = useState(false);
  interface MatriceType {
    [key: string]: { value: number | undefined; dose?: number } | undefined;
  }

  const matrice: MatriceType[] = [
    {
      '0': { value: 75, dose: 4 },
      '1': { value: 75, dose: 4 },
      '2': { value: 75, dose: 4 },
      '3': { value: 150, dose: 4 },
      '4': { value: 150, dose: 4 },
      '5': { value: 150, dose: 4 },
      '6': { value: 150, dose: 4 },
      '7': { value: 150, dose: 4 },
      '8': { value: 300, dose: 4 },
      '9': { value: 300, dose: 4 },
    },
    {
      '0': { value: 150, dose: 4 },
      '1': { value: 150, dose: 4 },
      '2': { value: 150, dose: 4 },
      '3': { value: 300, dose: 4 },
      '4': { value: 300, dose: 4 },
      '5': { value: 300, dose: 4 },
      '6': { value: 300, dose: 4 },
      '7': { value: 300, dose: 4 },
      '8': { value: 450, dose: 4 },
      '9': { value: 600, dose: 4 },
    },
    {
      '0': { value: 150, dose: 4 },
      '1': { value: 150, dose: 4 },
      '2': { value: 225, dose: 4 },
      '3': { value: 300, dose: 4 },
      '4': { value: 300, dose: 4 },
      '5': { value: 450, dose: 4 },
      '6': { value: 450, dose: 4 },
      '7': { value: 450, dose: 4 },
      '8': { value: 600, dose: 4 },
      '9': { value: 375, dose: 2 },
    },
    {
      '0': { value: 225, dose: 4 },
      '1': { value: 225, dose: 4 },
      '2': { value: 300, dose: 4 },
      '3': { value: 450, dose: 4 },
      '4': { value: 450, dose: 4 },
      '5': { value: 450, dose: 4 },
      '6': { value: 600, dose: 4 },
      '7': { value: 600, dose: 4 },
      '8': { value: 450, dose: 2 },
      '9': { value: 525, dose: 2 },
    },
    {
      '0': { value: 225, dose: 4 },
      '1': { value: 300, dose: 4 },
      '2': { value: 450, dose: 4 },
      '3': { value: 450, dose: 4 },
      '4': { value: 600, dose: 4 },
      '5': { value: 600, dose: 4 },
      '6': { value: 375, dose: 2 },
      '7': { value: 375, dose: 2 },
      '8': { value: 525, dose: 2 },
      '9': { value: 600, dose: 2 },
    },
    {
      '0': { value: 300, dose: 4 },
      '1': { value: 300, dose: 4 },
      '2': { value: 450, dose: 4 },
      '3': { value: 600, dose: 4 },
      '4': { value: 600, dose: 4 },
      '5': { value: 375, dose: 2 },
      '6': { value: 450, dose: 2 },
      '7': { value: 525, dose: 2 },
      '8': { value: 600, dose: 2 },
      '9': { value: undefined },
    },
    {
      '0': { value: 300, dose: 4 },
      '1': { value: 225, dose: 2 },
      '2': { value: 450, dose: 4 },
      '3': { value: 600, dose: 4 },
      '4': { value: 375, dose: 2 },
      '5': { value: 450, dose: 2 },
      '6': { value: 450, dose: 2 },
      '7': { value: 300, dose: 2 },
      '8': { value: undefined },
      '9': { value: undefined },
    },
    {
      '0': { value: 225, dose: 2 },
      '1': { value: 225, dose: 2 },
      '2': { value: 300, dose: 2 },
      '3': { value: 375, dose: 2 },
      '4': { value: 450, dose: 2 },
      '5': { value: 450, dose: 2 },
      '6': { value: 525, dose: 2 },
      '7': { value: undefined },
      '8': { value: undefined },
      '9': { value: undefined },
    },
    {
      '0': { value: 225, dose: 2 },
      '1': { value: 225, dose: 2 },
      '2': { value: 300, dose: 2 },
      '3': { value: 375, dose: 2 },
      '4': { value: 450, dose: 2 },
      '5': { value: 525, dose: 2 },
      '6': { value: 600, dose: 2 },
      '7': { value: undefined },
      '8': { value: undefined },
      '9': { value: undefined },
    },
    {
      '0': { value: 225, dose: 2 },
      '1': { value: 300, dose: 2 },
      '2': { value: 375, dose: 2 },
      '3': { value: 450, dose: 2 },
      '4': { value: 525, dose: 2 },
      '5': { value: 600, dose: 2 },
      '6': { value: undefined },
      '7': { value: undefined },
      '8': { value: undefined },
      '9': { value: undefined },
    },
    {
      '0': { value: 225, dose: 2 },
      '1': { value: 300, dose: 2 },
      '2': { value: 375, dose: 2 },
      '3': { value: 450, dose: 2 },
      '4': { value: 600, dose: 2 },
      '5': { value: undefined },
      '6': { value: undefined },
      '7': { value: undefined },
      '8': { value: undefined },
      '9': { value: undefined },
    },
    {
      '0': { value: 300, dose: 2 },
      '1': { value: 300, dose: 2 },
      '2': { value: 450, dose: 2 },
      '3': { value: 525, dose: 2 },
      '4': { value: 600, dose: 2 },
      '5': { value: undefined },
      '6': { value: undefined },
      '7': { value: undefined },
      '8': { value: undefined },
      '9': { value: undefined },
    },
    {
      '0': { value: 300, dose: 2 },
      '1': { value: 375, dose: 2 },
      '2': { value: 450, dose: 2 },
      '3': { value: 525, dose: 2 },
      '4': { value: undefined },
      '5': { value: undefined },
      '6': { value: undefined },
      '7': { value: undefined },
      '8': { value: undefined },
      '9': { value: undefined },
    },
    {
      '0': { value: 300, dose: 2 },
      '1': { value: 375, dose: 2 },
      '2': { value: 525, dose: 2 },
      '3': { value: 600, dose: 2 },
      '4': { value: undefined },
      '5': { value: undefined },
      '6': { value: undefined },
      '7': { value: undefined },
      '8': { value: undefined },
      '9': { value: undefined },
    },
  ];

  const Poids: { [key: string]: number } = {
    '>20- 25': 0,
    '>25- 30': 1,
    '>30- 40': 2,
    '>40- 50': 3,
    '>50- 60': 4,
    '>60- 70': 5,
    '>70- >80': 6,
    '>80-90': 7,
    '>90- 125': 8,
    '>125- 150': 9,
  };

  const Taux: { [key: string]: number } = {
    '>30-100': 0,
    '>100-200': 1,
    '>200-300': 2,
    '>300-400': 3,
    '>400-500': 4,
    '>500-600': 5,
    '>600-700': 6,
    '>700-800': 7,
    '>800-900': 8,
    '>900- 1000': 9,
    '>1000- 1100': 10,
    '>1110-1200': 11,
    '>1200-1300': 12,
    '>1300-1500': 13,
  };

  const TauxOptions: string[] = [
    '>30-100',
    '>100-200',
    '>200-300',
    '>300-400',
    '>400-500',
    '>500-600',
    '>600-700',
    '>700-800',
    '>800-900',
    '>900- 1000',
    '>1000- 1100',
    '>1110-1200',
    '>1200-1300',
    '>1300-1500',
  ];

  const poisOptions: string[] = [
    '>20- 25',
    '>25- 30',
    '>30- 40',
    '>40- 50',
    '>50- 60',
    '>60- 70',
    '>70- >80',
    '>80-90',
    '>90- 125',
    '>125- 150',
  ];

  const handleChangePoid = (e: any) => {
    setPoid(e.value);
    seterror(false);
  };
  const handleChangeTaux = (e: any) => {
    settaux(e.value);
    seterror(false);
  };
  return (
    <div className="flex md:flex-col flex-row-reverse md:w-10/12 w-full justify-evenly min-h-400 bg-grey-700  m-auto px-8 py-12 lg:px-4 md:px-5 sm:px-5">
      <div className="pres flex-0.5 flex flex-col  justify-around">
        {true && (
          <ImagePreview src="https://api-guide-alize.wereact.tech/uploads/trainings/tables/XOLAIR_tableau.png" />
        )}
      </div>
      <div className="values p-6 flex-0.5 flex flex-col justify-evenly">
        {resultat && (
          <div className="pres items-center flex-0.5 flex flex-col  justify-around text-center">
            <h3 className="title text-lg font-bold text-green pb-3">Résultat</h3>
            <p className="present align-middle font-normal text-sm    w-9/12 flex-0.8">
              {resultat.value === undefined ? (
                <p>
                  Les données sont insuffisantes pour recommander une posologie. Habituellement on donne la dose
                  maximale de la colonne poids du tableau
                </p>
              ) : (
                <div className=" font-normal text-sm">
                  <p className="font-semibold">
                    Taux initial d’IgE (Ul/ml) : <span className="font-normal">{taux}</span>
                  </p>
                  <p className="font-semibold">
                    Poids corporel (kg) : <span className="font-normal">{poid}</span>
                  </p>
                  <br />
                  <p className="font-semibold text-lg">
                    Résultat :{' '}
                    <span className="font-normal text-lg">
                      Administration de <span className=" font-bold">{resultat.value} mg</span> toutes les{' '}
                      <span className=" font-bold">{resultat.dose} semaines</span>
                    </span>
                  </p>
                </div>
              )}
            </p>
            <br />
            <br />
            <button
              onClick={() => {
                setresultat(undefined);
                setPoid('');
                settaux('');
              }}
              className="underline font-bold"
            >
              Adapter de nouveau
            </button>
          </div>
        )}
        {resultat === undefined && (
          <>
            <div className="flex flex-col">
              <h3 className="title font-bold text-green pb-3 ">Adaptation des doses (d'après l'EMA)</h3>
              <p className="present  text-base w-full ">
                Adaptation des doses du XOLAIR en fonction du poids( kg) et des doses d'IgE totales ( UI/ml). La
                combinaison poids et IgE totales indiquent la dose et la fréquence des injections
              </p>
            </div>
            <div className="select2">
              <p className="select_label text-blue-600 font-semibold py-4">Taux initial d’IgE (Ul/ml)</p>
              <GuideSelect
                isNotSearchable
                className2={classNames('border border-blue-950 hover:border-green', classes.select)}
                className=" md:w-full "
                placeholder="Taux initial d’IgE (Ul/ml)"
                value={taux}
                options={[...TauxOptions].map((e) => ({ value: e, label: e }))}
                onChange={handleChangeTaux}
              />
            </div>
            <div className="select1">
              <p className="select_label text-blue-600 font-semibold py-4">Poids corporel (kg)</p>
              <GuideSelect
                isNotSearchable
                className=" md:w-full"
                className2={classNames('border border-blue-950 hover:border-green', classes.select)}
                placeholder="Poids corporel (kg)"
                value={poid}
                options={[...poisOptions].map((e) => ({ value: e, label: e }))}
                onChange={handleChangePoid}
              />
            </div>
            {error && (
              <div className="2xl:text-xs mt-1.5 text-sm h-5 relative left-1 sm:text-10 text-red-250">
                Veuiller remplir les deux champs
              </div>
            )}
            <Button
              onClick={() => {
                if (!taux || !poid) {
                  seterror(true);
                } else {
                  setresultat(matrice[Taux[taux]][Poids[poid]]);
                }
              }}
              className="w-full  bg-green hover:bg-blue-650 text-white my-4"
              size="xl"
            >
              <div className="flex items-center justify-center gap-5 w-full">
                <div className="w-28 font-bold "> Adapter</div>
              </div>
            </Button>{' '}
          </>
        )}
      </div>
    </div>
  );
}
