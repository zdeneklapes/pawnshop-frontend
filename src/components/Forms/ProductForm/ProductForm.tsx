import { useState } from 'react'
import { format, addWeeks } from 'date-fns'
import { Formik } from 'formik'
import { object, string } from 'yup'

import { Input } from '@components/small/Input'
import { InputNumber } from '@components/small/InputNumber'
import { Combobox } from '@components/small/Combobox'
import { Radio } from '@components/small/Radio'
import { Button } from '@components/small/Button'

export interface ProductValuesProps {
  isBuy: boolean
  name: string
  address: string
  sex: string
  nationality: string
  personalId: string
  personalIdDate: string
  birthPlace: string
  birthId: string
  interestRateOrAmount: string
  startDate: string
  endDate: string
  extendedDate: string
  productId: string
  productName: string
  productBuy: string
  productSell: string
  amount: string
}

const PRODUCT_INIT_VALUES: ProductValuesProps = {
  isBuy: false,
  name: '',
  address: '',
  sex: '',
  nationality: '',
  personalId: '',
  personalIdDate: '',
  birthPlace: '',
  birthId: '',
  interestRateOrAmount: '',
  startDate: format(new Date(), 'dd/MM/yyyy'),
  endDate: format(addWeeks(new Date(), 4), 'dd/MM/yyyy'),
  productId: '',
  productName: '',
  productBuy: '',
  productSell: ''
}
const nameOptions = ['option1', 'option2']
const SEX_OPTIONS = [
  { value: 'male', label: 'Muž' },
  { value: 'female', label: 'Žena' }
]
const FORM_TYPE = [
  { value: false, label: 'Zastavarna' },
  { value: true, label: 'Bazar' }
]
const nationalityOptions = ['ČR', 'SK']

export const PRODUCT_SCHEMA = (): any =>
  object()
    .shape({
      name: string().required(),
      address: string().required(),
      nationality: string().required(),
      personalId: string().required(),
      personalIdDate: string()
        .required()
        .matches(/^\d{2}[/]\d{2}[/]\d{4}/),
      birthPlace: string().required(),
      birthId: string().required(),
      interestRateOrAmount: string().required(),
      productId: string().required().matches(/^\d+$/),
      productName: string().required(),
      productBuy: string()
        .required()
        .matches(/^\d+$|^\d+[.]\d{1,2}$/),
      productSell: string()
        .required()
        .matches(/^\d+$|^\d+[.]\d{1,2}$/)
    })
    .required()

const STYLE_ROW_FORM = 'flex items-center justify-between space-x-5 mx-5'

const ProductForm = () => {
  const [isBuy, setIsBuy] = useState<boolean | string>(false)

  const handleSubmit = (values: ProductValuesProps) => {
    console.log(values)
  }
  return (
    <div className="p-8 border rounded-xl border-gray-500 shadow-2xl">
      <Formik initialValues={PRODUCT_INIT_VALUES} validationSchema={PRODUCT_SCHEMA} onSubmit={handleSubmit}>
        {({ values, errors, handleSubmit, setFieldValue, resetForm, touched }) => {
          return (
            <form onSubmit={handleSubmit}>
              <div className="divide-y divide-gray-400">
                <div className="flex flex-col space-y-4 pb-6">
                  <div className="flex space-x-10 justify-center">
                    <Radio
                      className="w-40"
                      options={FORM_TYPE}
                      onChange={(value) => {
                        setIsBuy(value)
                        setFieldValue('isBuy', value)
                        setFieldValue('productBuy', '')
                        setFieldValue('productSell', '')
                        setFieldValue('interestRateOrAmount', '')
                      }}
                      value={values.isBuy}
                    />
                  </div>
                  <div className={STYLE_ROW_FORM}>
                    <Combobox
                      options={nameOptions}
                      label="Meno"
                      onChange={(value) => {
                        setFieldValue('name', value)
                      }}
                      value={values.name}
                      errored={!!(errors.name && touched.name)}
                    />
                    <Input
                      name="address"
                      label="Adresa"
                      onChange={(value) => setFieldValue('address', value)}
                      value={values.address}
                      errored={!!(errors.address && touched.address)}
                    />
                    <Combobox
                      label="Národnosť"
                      options={nationalityOptions}
                      onChange={(value) => setFieldValue('nationality', value)}
                      value={values.nationality}
                      errored={!!(errors.nationality && touched.nationality)}
                    />
                  </div>
                  <div className={STYLE_ROW_FORM}>
                    <Input
                      name="birthId"
                      label="Rodné číslo"
                      onChange={(value) => setFieldValue('birthId', value)}
                      value={values.birthId}
                      errored={!!(errors.birthId && touched.birthId)}
                    />
                    <Input
                      name="personalId"
                      label="Číslo OP"
                      onChange={(value) => setFieldValue('personalId', value)}
                      value={values.personalId}
                      errored={!!(errors.personalId && touched.personalId)}
                    />
                    <Input
                      name="personalIdDate"
                      label="Platnosť do"
                      onChange={(value) => setFieldValue('personalIdDate', value)}
                      value={values.personalIdDate}
                      errored={!!(errors.personalIdDate && touched.personalIdDate)}
                    />
                  </div>
                  <div className="flex items-center justify-center space-x-16">
                    <Radio
                      options={SEX_OPTIONS}
                      label="Pohlavie"
                      onChange={(value) => setFieldValue('sex', value)}
                      value={values.sex}
                    />
                    <Input
                      name="birthPlace"
                      label="Místo narození"
                      onChange={(value) => setFieldValue('birthPlace', value)}
                      value={values.birthPlace}
                      errored={!!(errors.birthPlace && touched.birthPlace)}
                    />
                  </div>
                </div>
                {/* Product info */}
                <div className="py-6 space-y-4">
                  <div className={STYLE_ROW_FORM}>
                    <Input
                      classNameInput="w-96"
                      name="productName"
                      label="Předmet"
                      onChange={(value) => setFieldValue('productName', value)}
                      value={values.productName}
                      errored={!!(errors.productName && touched.productName)}
                    />
                    <InputNumber
                      name="productId"
                      label="Inventárí číslo"
                      onChange={(value) => setFieldValue('productId', value)}
                      value={values.productId}
                      errored={!!(errors.productId && touched.productId)}
                      isDecimal
                    />
                  </div>
                  <div className={STYLE_ROW_FORM}>
                    <div className="flex space-x-4">
                      <InputNumber
                        classNameInput="w-64"
                        name="productBuy"
                        label={isBuy ? 'Nákup' : 'Pújička'}
                        value={values.productBuy}
                        onChange={(value) => setFieldValue('productBuy', value)}
                        errored={!!(errors.productBuy && touched.productBuy)}
                      />
                      <InputNumber
                        classNameInput="w-16"
                        name="interestRateOrAmount"
                        label={isBuy ? 'ks' : '%'}
                        onChange={(value) => setFieldValue('interestRateOrAmount', value)}
                        value={values.interestRateOrAmount}
                        errored={!!(errors.interestRateOrAmount && touched.interestRateOrAmount)}
                        isDecimal={!!isBuy}
                      />
                    </div>
                    <InputNumber
                      classNameInput="w-64"
                      name="productSell"
                      label={isBuy ? 'Prodej' : 'K vyplacení'}
                      value={values.productSell}
                      onChange={(value) => setFieldValue('productSell', value)}
                      disabled={!isBuy}
                      errored={!!(errors.productSell && touched.productSell)}
                    />
                  </div>
                </div>
                <div className="flex w-full justify-between items-center pt-6">
                  <div className={STYLE_ROW_FORM}>
                    <Input
                      classNameInput="w-32"
                      name="startDate"
                      label="Uzavírají dne"
                      value={values.startDate}
                      disabled
                    />
                    <Input classNameInput="w-32" name="endDate" label="Splatná dne" value={values.endDate} disabled />
                  </div>
                  <div className="mt-6 space-x-5">
                    <Button
                      className="w-32 hover:text-red-800 hover:border-red-800"
                      onClick={() => {
                        resetForm()
                      }}
                      text="Vyčistiť"
                    />
                    <Button
                      className="w-32 hover:text-green-800 hover:border-green-800"
                      type="submit"
                      text="Potvrdiť"
                    />
                  </div>
                </div>
              </div>
            </form>
          )
        }}
      </Formik>
    </div>
  )
}

export default ProductForm
