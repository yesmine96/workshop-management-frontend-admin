/* eslint-disable no-nested-ternary */
import ModalComponent from 'components/ux/ModalDetailNote';
import ModalReview from 'components/ux/ModalReview';
import { FunctionComponent, useState } from 'react';


export type HeadertrainingProps = {
  training?: any;
};

const trainingHeader: FunctionComponent<HeadertrainingProps> = ({
  training,
  ...rest
}) => {
  const [open, setOpen] = useState(false);
  const [openReview, setOpenReview] = useState(false);

  const onOpen = () => {
    setOpen(true);
  };

  const onOpenReview = () => {
    setOpenReview(true);
  };

  return (
    <div className="flex flex-col w-full" {...rest}>
     
      <div className="flex justify-between mb-8">
       
        <div
          className={`${

            'flex flex-row gap-1 lg:gap-2  sm:-ml-3 '
          }`}
        >
         <div className='bg-green rounded-lg p-2 text-white'  onClick={onOpen} >S'incrire</div>

         <div className='bg-green rounded-lg p-2 text-white'  onClick={onOpenReview} >Donner un avis</div>

        </div>
      </div>
      <ModalReview
      
        training={training}
        onClose={() => {
          setOpenReview(false);
        }}
        open={openReview}
      />
      <ModalComponent
        training={training}
        onClose={() => {
          setOpen(false);
        }}
        open={open}
      />
    </div>
  );
};

export default trainingHeader;
