import Modal from 'components/common/Modal/Modal';
import Button from 'components/ux/Button';
import Input from 'components/ux/Input';
import { useFormik } from 'formik';
import React, { useEffect, useMemo, useState } from 'react';
import Select from 'components/ux/Select/Select';

import * as Yup from 'yup';
import { useSubCategory } from 'requests/SubCategory/subCategory.service';
import { useGetTrainer } from 'requests/Trainer/trainer.service';
import { useCategory } from 'requests/Category/category.service';
import transformSelect from 'hooks/useSelectData';
interface Props {
  open: boolean;
  setOpen: (v: boolean) => void;
  onSubmit: (v: any) => void;
  id?: string;
}

export default function ModalTrainer({ open, setOpen, onSubmit, id }: Props) {
  const { data: dataCategoty } = useCategory({ fetchPolicy: 'no-cache' });
  const [idSubCategory, setIdSubCategory] = useState<any>([]);

  const [idCategory, setIdCategory] = useState<any>([]);
  const { data } = useSubCategory({
    variables: { idCategory },
    fetchPolicy: 'no-cache',
  });
  const [getTrainer, { data: dataTrainer }] = useGetTrainer({
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    if (id) {
      getTrainer({
        variables: {
          id,
        },
      });
    }
  }, [id]);
  const handleChangeCategory = (e: any) => {
    setIdCategory(e.value);
    setIdSubCategory([]);
    formik.setFieldValue('idCategory', e.value);
  };
  const initialValues = {
    fullName: id ? dataTrainer?.trainer?.fullName || '' : '',
    email: id ? dataTrainer?.trainer?.email || '' : '',
    telephone: id ? dataTrainer?.trainer?.telephone || '' : '',
    speciality: id ? dataTrainer?.trainer?.speciality || '' : '',
  };
  const formik = useFormik({
    validateOnBlur: false,
    validateOnChange: false,
    initialValues,
    validationSchema: Yup.object({
      fullName: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email').required('Email is required'),
      telephone: Yup.string().required('telephone is required'),
    }),
    onSubmit: (values) => {
      onSubmit(values);
    },
  });
  useEffect(() => {
    formik.setValues(initialValues);
  }, [id, dataTrainer]);
  const dataSelectCategory = useMemo(() => {
    if (!data) return [];
    return data?.subCategorys?.data.map((item) => ({
      label: item.name,
      value: item.id,
    }));
  }, [data]);
  const onChangeCategory = (option: any) => {
    formik.setFieldValue('speciality', option.value);
  };
  return (
    <div>
      <Modal
        className="w-[1230px] h-[920px] 2xl:w-[940px] 2xl:h-[80%] scale-[0.8]  "
        onClose={() => setOpen(false)}
        open={open}
      >
        <div className="flex flex-col w-full h-full px-[65px] py-4 gap-2">
          <p className=" font-medium text-3xl text-[#00458b] self-center">Modifier un formateur</p>
          <div className="flex  gap-[50px]  xl:flex-col xl:overflow-y-auto xl:pb-12 px-3  justify-center">
            <div className="flex flex-col flex-[0.6]">
              <Input
                errorClassName="text-[#FF4040]"
                labelClassName=" font-medium text-[20px] text-[black] "
                placeholder="Nom et Prènom"
                label="Nom et Prènom"
                id="fullName"
                onChange={formik.handleChange}
                value={formik.values.fullName}
                error={formik.errors.fullName}
                type="text"
              />
              <Input
                errorClassName="text-[#FF4040]"
                labelClassName=" font-medium text-[20px] text-[black] "
                placeholder="Télèphone"
                label="Télèphone"
                id="telephone"
                onChange={formik.handleChange}
                value={formik.values.telephone}
                error={formik.errors.telephone}
                type="text"
              />
              <Input
                errorClassName="text-[#FF4040]"
                labelClassName=" font-medium text-[20px] text-[black] "
                placeholder="email"
                label="email"
                id="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                error={formik.errors.email}
                type="text"
              />
              <div className="flex">
                <Select
                  options={transformSelect(dataCategoty?.categorys.data)}
                  onChange={handleChangeCategory}
                  name="idCategory"
                  isMulti={Boolean(false)}
                  labelSelect="Spécialité"
                  placeholder="Sélectionnez"
                  handleError
                />

                <Select
                  options={dataSelectCategory}
                  labelClassname="h-[20px] font-medium text-[20px] text-[black] "
                  onChange={onChangeCategory}
                  name="speciality"
                  isMulti={Boolean(false)}
                  placeholder="Sélectionnez"
                  handleError
                  labelSelect="  "
                  closeMenuOnSelect
                />
              </div>
            </div>
          </div>
          <Button
            className="bg-[#E56E1B] text-white rounded-xl px-8 py-2 self-center	"
            onClick={() => formik.submitForm()}
          >
            Submit
          </Button>
        </div>
      </Modal>
    </div>
  );
}
