import ScrollLeftArrow from 'components/icons/ScrollLeftArrow';
import ScrollRightArrow from 'components/icons/ScrollRightArrow';
import Button from 'components/ux/Button';
import StaisticsContainer from 'components/ux/StatisticsContainer';
import React, { useRef, useState } from 'react';
import Select from 'components/ux/Select/Select';

import { useFormik } from 'formik';
import { useGetTrainers } from 'requests/Trainer/trainer.service';
import { useCategory } from 'requests/Category/category.service';
import { useSubCategory } from 'requests/SubCategory/subCategory.service';
import transformSelect from 'hooks/useSelectData';
import { useGetSearch } from 'requests/Review/review.client';

interface Props {
  setcurrentStatus: (status: string) => void;
  currentStatus: string;
  refetch: any;
}

export default function HomeContainer({ setcurrentStatus, currentStatus, refetch }: Props) {
  const ref = useRef<any>(null);
  const [idCategory, setIdCategory] = useState<any>('');
  const [idSubCategory, setIdSubCategory] = useState<any>('');
  const [speciality, setSpeciality] = useState<string>('');
  const { data: dataReviews } = useGetSearch({
    fetchPolicy: 'no-cache',
  });
  const { data: dataTrainer } = useGetTrainers({
    variables: { speciality },
    fetchPolicy: 'no-cache',
  });
  const { data: dataCategoty } = useCategory({ fetchPolicy: 'no-cache' });
  const { data: dataSubCategoty } = useSubCategory({
    variables: { idCategory },
    fetchPolicy: 'no-cache',
  });
  const handleChangeCategory = (e: any) => {
    setIdCategory(e.value);
    setIdSubCategory([]);
    formik.setFieldValue('idCategory', e.value);
  };
  const handleChangeSubCategory = (e: any) => {
    setSpeciality(e.value);
    formik.setFieldValue('idSubCategories', e.value);
  };
  const list = [{ title: 'abc', field: 'é', number: 1 }];
  const initialValues = {
    idCategory: '',
    idSubCategories: '',
  };
  const formik = useFormik({
    initialValues,

    onSubmit: (values) => {},
  });
  return (
    <div className="relative">
      <div className="flex overflow-x-auto justify-between p-2 gap-x-2 min-h-[165px] ml-0">
        <div className="flex w-full xl:flex-col gap-2 ">
          <div className="flex ml-2 gap-4 w-[400px]">
            <div className="flex flex-1	 shadow-dropdown  rounded-xl bg-gray-200  p-2 items-center">
              <div className="w-1/2 pr-4 text-Caibre">
                <div className="text-gray">Totale des formations passées</div>
                <div className="text-purple-200  text-4xl 2xl:text-2xl font-semibold ">25</div>
              </div>
              <div className="border-l border-purple w-1/2 pl-4 text-Caibre">
                <div className="text-gray"> Totale des formations avenir</div>
                <div className="text-purple-200 text-4xl 2xl:text-2xl font-semibold ">20</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full font-medium text-[30px]  p-4">Liste des avis</div>

      <div className="flex p-4 justify-between w-full ">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            formik.handleSubmit(e);
          }}
          className="gap-x-4 flex w-full"
        >
          <Select
            options={transformSelect(dataCategoty?.categorys.data)}
            onChange={handleChangeCategory}
            name="idCategory"
            isMulti={Boolean(false)}
            labelSelect="Catégorie"
            placeholder="Catégorie"
            error={formik.touched.idCategory && idCategory.length === 0 ? 'Veuillez sélectionner une catégorie  ' : ''}
            handleError
          />
          <Select
            isDisabled={!idCategory.length}
            options={transformSelect(dataSubCategoty?.subCategorys.data)}
            onChange={handleChangeSubCategory}
            name="idSubCategory"
            labelSelect="Sous-Catégorie"
            placeholder="sous-catégorie"
            // values={idSubCategory}
            isMulti={Boolean(false)}
            error={
              formik.touched.idCategory && idCategory.length === 0 ? 'Veuillez sélectionner une sous-catégorie  ' : ''
            }
            handleError
          />
          <Select
            labelSelect="Formateur"
            options={transformSelect(dataTrainer?.trainers?.data)}
            labelClassname=" text-blue undefined font-CalibreSemiBold  2xl:mb-1 md:text-17 lg:text-17 text-20 2xl:text-20 flex items-center"
            onChange={(data: any) => {
              formik.setFieldValue('idTrainer', data.value);
            }}
            name="idTrainer"
            isMulti={Boolean(false)}
            placeholder="Formateur"
            handleError
            closeMenuOnSelect
            error={formik.touched.idCategory && idCategory.length === 0 ? 'Veuillez sélectionner un formateur  ' : ''}
          />
          <Select
            labelSelect="Nom de la formation"
            options={transformSelect(dataTrainer?.trainers?.data)}
            labelClassname=" text-blue undefined font-CalibreSemiBold  2xl:mb-1 md:text-17 lg:text-17 text-20 2xl:text-20 flex items-center"
            onChange={(data: any) => {
              formik.setFieldValue('idTrainer', data.value);
            }}
            name="idTrainer"
            isMulti={Boolean(false)}
            placeholder="Formation"
            handleError
            closeMenuOnSelect
            error={formik.touched.idCategory && idCategory.length === 0 ? 'Veuillez sélectionner un formateur  ' : ''}
          />
          <Button className="bg-[#E56E1B] text-white rounded-xl px-4 py-2 mt-4" onClick={() => formik.submitForm()}>
            Rechercher
          </Button>{' '}
        </form>
      </div>
      <div className="relative">
        <div
          ref={ref}
          className="flex gap-x-4   py-2 pb-5 overflow-visible hover:overflow-x-visible overflow-y-hidden px-8"
        >
          <div
            onClick={() => ref.current.scrollBy(-100, 0)}
            className="z-10 left-2 top-[100px] absolute flex items-center cursor-pointer hover:scale-150 "
          >
            <ScrollLeftArrow />
          </div>
          {dataReviews?.searchReview.data.map((item: any) => (
            <StaisticsContainer
              refetch={refetch}
              currentStatus={currentStatus}
              setcurrentStatus={setcurrentStatus}
              title={item?.idTraining?.name}
              field={item?.field}
              className="flex-1 min-h-[250px] min-w-[180px] max-w-[250px] rounded-xl p-4 "
              text={item?.text}
              trainer={item?.idTraining?.idTrainer?.fullName}
              category={item?.idTraining?.idCategory?.name}
              subCategory={item?.idTraining?.idSubCategories?.name}
            />
          ))}
          <div
            onClick={() => ref.current.scrollBy(100, 0)}
            className="z-10 absolute right-2 top-[100px]  flex items-center cursor-pointer  hover:scale-150 "
          >
            <ScrollRightArrow />
          </div>
        </div>
      </div>
    </div>
  );
}
