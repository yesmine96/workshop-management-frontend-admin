import React from 'react';
import TableTrainer from './TableTrainer';

export default function GestionEnvoi() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="font-medium text-[30px] ">Gestion des formateurs</h1>
      </div>
      <TableTrainer />
    </div>
  );
}
