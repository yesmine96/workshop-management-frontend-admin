import React, { useEffect, useState } from 'react';

import { useFormik } from 'formik';

import * as Yup from 'yup';

import Input from 'components/ux/Input';
import Select from 'components/ux/Select/Select';
import { useCreateTraining, useGetTraining } from 'requests/Training/training.service';
import Button from 'components/ux/Button';
import ImagePreview from 'components/common/PreviewImage/ImagePreview';
import CloseIcon from 'components/icons/CloseIcon';
import DatePickerInput from 'components/ux/DatePickerInput';
import moment from 'moment';
import { useGetTrainers } from 'requests/Trainer/trainer.service';
import { useCategory } from 'requests/Category/category.service';
import transformSelect from 'hooks/useSelectData';
import { useSubCategory } from 'requests/SubCategory/subCategory.service';
import { useParams } from 'react-router-dom';

const AddTraining = () => {
  const params = useParams<{ id: string }>();
  const [fileUpload, setFileUpload] = useState<any[]>([]);
  const [idCategory, setIdCategory] = useState<any>([]);
  const [idSubCategory, setIdSubCategory] = useState<any>([]);
  const [speciality, setSpeciality] = useState<string>('');
  const [image, setImage] = useState<string[]>([]);
  const [, setErrorImage] = useState<string>();

  const [createTraining] = useCreateTraining({ fetchPolicy: 'no-cache' });
  const { data: dataTraining } = useGetTraining({
    variables: { id: params.id },
    fetchPolicy: 'no-cache',
  });
  const { data: dataTrainer } = useGetTrainers({
    variables: { availablity: true, speciality },
    fetchPolicy: 'no-cache',
  });
  const { data: dataCategoty } = useCategory({ fetchPolicy: 'no-cache' });
  const { data: dataSubCategoty } = useSubCategory({
    variables: { idCategory },
    fetchPolicy: 'no-cache',
  });

  const handleChangefile = (event: any) => {
    if (image.length < 3) {
      if (event.target.files[0]) {
        [...event.target.files].forEach((e: any, index: number) => {
          const reader = new FileReader();
          if (e) {
            const imgg = URL.createObjectURL(e);

            reader.readAsDataURL(e);

            setImage((old) => [...old, imgg]);
            setFileUpload((old = []) => [...old, e]);
          }
        });
      }
    } else {
      setErrorImage('Télécharger maximum 3 photos de votre produit');
      setTimeout(() => {
        setErrorImage('');
      }, 3000);
    }
  };

  // Functions
  const handleChangeCategory = (e: any) => {
    setIdCategory(e.value);
    setIdSubCategory([]);
    formik.setFieldValue('idCategory', e.value);
  };
  const handleChangeSubCategory = (e: any) => {
    setSpeciality(e.value);
    formik.setFieldValue('idSubCategories', e.value);
  };
  const initialValues = {
    name: dataTraining?.training?.name,
    price: dataTraining?.training?.price,
    idCategory: dataTraining?.training?.idCategory?.id,
    idSubCategories: '',
    membersNumber: 1,
    description: dataTraining?.training?.description,
    idTrainer: '',
    dateStart: moment().format('YYYY-MM-DD h:mm:ss'),
    dateEnd: moment().format('YYYY-MM-DD h:mm:ss'),
  };
  useEffect(() => {
    formik.setValues(initialValues);
  }, [params.id, dataTraining]);
  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      // name: Yup.string().trim().required('Veuillez saisir le nom du produit'),
      // membersNumber: Yup.number()
      //   .integer(`Ce champ n'aacepte que les nombres entiers`)
      //   .required('Veuillez saisir une quantité')
      //   .min(0, 'Veuillez saisir une quantité supérieur à 0'),
      // price: Yup.number().required('Veuillez saisir le prix de vente"').min(1, 'Veuillez saisir un prix supérieur à 0'),
    }),

    onSubmit: (values) => {
      createTraining({
        variables: { ...values, image: fileUpload },
      }).then(() => {
        console.log('heu');
      });
    },
  });
  return (
    <div className="flex flex-col w-full  lg:px-8 bg-grey-200 ">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit(e);
        }}
      >
        <div className="flex flex-col w-full">
          <div className="flex flex-row sm:flex-col">
            <div className="flex flex-col mr-10 sm:w-full flex-[0.5]    ">
              <div className="w-full mb-7">
                <div className="text-blue font-CalibreSemiBold  2xl:mb-1 md:text-17 lg:text-17 text-22 2xl:text-base">
                  Photos de la formation *
                </div>
                <div className="w-full h-full bg-white border-1 border-grey-300 justify-center  flex flex-col">
                  {image.length !== 0 && (
                    <div className="flex items-center h-full justify-center gap-3 2xl:px-2 ">
                      {image.map((url, index) => (
                        <div style={{ position: 'relative' }}>
                          <ImagePreview className=" z-[5] border-1 w-[auto] h-[212px]" src={url} alt="" />
                          <CloseIcon
                            width={25}
                            stroke="red"
                            className=" cursor-pointer"
                            fill="red"
                            style={{ position: 'absolute', top: '-5px', right: '0px' }}
                            onClick={() => {
                              setFileUpload(fileUpload.filter((_ele, key) => key !== index));
                              setImage(image.filter((ele) => ele !== url));
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="flex flex-col justify-center items-center ">
                    <label htmlFor="single">
                      {fileUpload.length >= 1 ? (
                        <div className="flex flex-row justify-center cursor-pointer">
                          <div className="font-CalibreRegular text-sm text-grey-500 opacity-70 mt-1">
                            {' '}
                            Télécharger minimum une photo de votre produit{' '}
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col justify-center cursor-pointer">
                          <div className="font-CalibreRegular text-sm text-grey-500 opacity-70 mt-1">
                            {' '}
                            Télécharger minimum une photo de votre produit{' '}
                          </div>
                        </div>
                      )}
                    </label>
                    <input
                      type="file"
                      name="image"
                      multiple
                      id="single"
                      onBlur={formik.handleBlur}
                      onChange={(e: any) =>
                        // eslint-disable-next-line no-alert
                        handleChangefile(e)
                      }
                      // value={formik.values.image}
                    />
                  </div>
                </div>
                {/* <div className="truncate mt-2 text-base 2xl:text-xs font-CalibreRegular relative left-1 text-orange">
                  {formik.touched.image && image.length === 0 && 'Télécharger minimum une photo de votre produit'}

                  {errorImage}
                </div> */}
              </div>
              <div className="mt-12">
                <Input
                  label="Description"
                  type="text"
                  textarea
                  name="description"
                  rows={5}
                  placeholder="Décrivez votre produit.."
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.errors.description}
                  handleError
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 flex-col w-full h-3/4 flex-[0.5]" style={{ maxHeight: '650px' }}>
              <Input
                label="Nom du produit *"
                type="text"
                name="name"
                placeholder="Nom du produit"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name ? formik.errors.name : ''}
                handleError
              />

              <Input
                label="Prix *"
                type="text"
                name="price"
                placeholder=""
                iconRight={<div className="font-CalibreBold tex-2xl text-blue">DT </div>}
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.price ? formik.errors.price : ''}
                handleError
              />

              <Input
                label="Disponibilité du produit *"
                type="number"
                name="membersNumber"
                placeholder="Quantité de produits disponibles"
                value={formik.values.membersNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.membersNumber}
                handleError
              />

              <Select
                options={transformSelect(dataCategoty?.categorys.data)}
                onChange={handleChangeCategory}
                name="idCategory"
                isMulti={Boolean(false)}
                labelSelect="Catégorie *"
                placeholder="Sélectionnez une catégorie"
                error={
                  formik.touched.idCategory && idCategory.length === 0 ? 'Veuillez sélectionner une catégorie  ' : ''
                }
                handleError
              />
              <Select
                isDisabled={!idCategory.length}
                options={transformSelect(dataSubCategoty?.subCategorys.data)}
                onChange={handleChangeSubCategory}
                name="idSubCategories"
                labelSelect="Sous-Catégorie"
                placeholder="Sélectionnez une sous-catégorie"
                values={idSubCategory}
                isMulti={Boolean(false)}
              />
              <Select
                labelSelect="Formateur"
                options={transformSelect(dataTrainer?.trainers?.data)}
                labelClassname=" font-medium text-[20px] text-[black] "
                onChange={(data: any) => {
                  formik.setFieldValue('idTrainer', data.value);
                }}
                name="idTrainer"
                isMulti={Boolean(false)}
                placeholder="Formateur"
                handleError
                closeMenuOnSelect
              />
              <DatePickerInput
                value={formik.values.dateStart}
                name="dateStart"
                onChange={(date) => formik.setFieldValue('dateStart', date)}
              />
              <DatePickerInput
                value={formik.values.dateEnd}
                name="dateEnd"
                onChange={(date) => formik.setFieldValue('dateEnd', date)}
              />
            </div>
          </div>
        </div>
        <Button className="bg-[#E56E1B] text-white rounded-xl px-8 py-2" onClick={() => formik.submitForm()}>
          Submit
        </Button>{' '}
      </form>
    </div>
  );
};
export default AddTraining;
