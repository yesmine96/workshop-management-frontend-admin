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
      name: Yup.string().trim().required('Veuillez saisir le nom de la formation'),
      membersNumber: Yup.number()
        .integer(`Ce champ n'aacepte que les nombres entiers`)
        .required('Veuillez saisir une quantité')
        .min(0, 'Veuillez saisir une quantité supérieur à 0'),
      price: Yup.number()
        .required('Veuillez saisir le prix de la formation"')
        .min(1, 'Veuillez saisir un prix supérieur à 0'),
      dateStart: Yup.date()
        .required('Veuillez indiquer la date de début ')
        .min(
          moment(new Date(), 'x').format('DD MMMM YYYY'),
          "La date doit être égale ou supérieure à la date d'aujourd'hui",
        ),
      dateEnd: Yup.date()
        .required('Veuillez indiquer la date de fin')
        .min(Yup.ref('dateStart'), `La date du fin doit être supérieur à la date de début`),
    }),

    onSubmit: (values) => {
      createTraining({
        variables: { ...values, image: fileUpload },
      }).then(() => {});
    },
  });
  return (
    <div className="flex flex-col w-full  lg:px-8 bg-grey-200 ">
      <div>
        <h1 className="font-medium text-[30px] ">Ajouter une formation</h1>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit(e);
        }}
        className="pt-4"
      >
        <div className="flex flex-col w-full">
          <div className="flex flex-row sm:flex-col">
            <div className="flex flex-col mr-10 sm:w-full flex-[0.5] justify-between    ">
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
                            Télécharger minimum une photo de la formation{' '}
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col justify-center cursor-pointer">
                          <div className="font-CalibreRegular text-sm text-grey-500 opacity-70 mt-1">
                            {' '}
                            Télécharger minimum une photo de la formation{' '}
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
                  placeholder="Décrivez la formation.."
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.errors.description}
                  handleError
                  labelClassName="text-black font-CalibreSemiBold"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8 flex-col w-full h-3/4 flex-[0.5]" style={{ maxHeight: '650px' }}>
              <Input
                label="Nom de la formation *"
                type="text"
                name="name"
                placeholder="Nom de la formation"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name ? formik.errors.name : ''}
                handleError
                labelClassName="text-black font-CalibreSemiBold
                "
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
                labelClassName="text-black font-CalibreSemiBold"
              />

              <Input
                label="Nombre de places *"
                type="number"
                name="membersNumber"
                placeholder="Nombre de places *"
                value={formik.values.membersNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.membersNumber}
                handleError
                labelClassName="text-black font-CalibreSemiBold	"
              />

              <Select
                options={transformSelect(dataCategoty?.categorys.data)}
                onChange={handleChangeCategory}
                name="idCategory"
                isMulti={Boolean(false)}
                labelSelect="Catégorie *"
                placeholder="Catégorie"
                error={
                  formik.touched.idCategory && idCategory.length === 0 ? 'Veuillez sélectionner une catégorie  ' : ''
                }
                handleError
              />
              <Select
                isDisabled={!idCategory.length}
                options={transformSelect(dataSubCategoty?.subCategorys.data)}
                onChange={handleChangeSubCategory}
                name="idSubCategory"
                labelSelect="Sous-Catégorie *"
                placeholder="sous-catégorie"
                // values={idSubCategory}
                isMulti={Boolean(false)}
                error={
                  formik.touched.idCategory && idCategory.length === 0
                    ? 'Veuillez sélectionner une sous-catégorie  '
                    : ''
                }
                handleError
              />
              <Select
                labelSelect="Formateur *"
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
                error={
                  formik.touched.idCategory && idCategory.length === 0 ? 'Veuillez sélectionner un formateur  ' : ''
                }
              />
              <div>
                <span>Date de début *</span>
                <DatePickerInput
                  value={formik.values.dateStart}
                  name="dateStart"
                  onChange={(date) => formik.setFieldValue('dateStart', date)}
                  showTimeSelect
                />
              </div>
              <div>
                <span>Date de fin *</span>
                <DatePickerInput
                  value={formik.values.dateEnd}
                  name="dateEnd"
                  onChange={(date) => formik.setFieldValue('dateEnd', date)}
                  showTimeSelect
                />
              </div>
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
