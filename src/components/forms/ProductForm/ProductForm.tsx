import { useState, useMemo } from 'react'
import { format, addWeeks } from 'date-fns'
import { Formik } from 'formik'
import { object, string } from 'yup'

import { Input } from '@components/small/Input'
import { InputNumber } from '@components/small/InputNumber'
import { Combobox } from '@components/small/Combobox'
import { Radio } from '@components/small/Radio'
import { Button } from '@components/small/Button'
import { SubmitModal } from '@components/small/SubmitModal'

import { apiService } from '@api/service'

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
  productId: string
  productName: string
  productBuy: string
  productSell: string
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

const customers = [
  {
    name: 'andrej',
    address: 'add1',
    sex: 'male',
    nationality: 'SK',
    personalId: '40444',
    personalIdDate: '12/12/1212',
    birthPlace: 'Brno',
    birthId: '10001'
  },
  {
    name: 'andrej222',
    address: 'add1222',
    sex: 'female',
    nationality: 'DE',
    personalId: '40444222',
    personalIdDate: '12/12/1222',
    birthPlace: 'Kosice',
    birthId: '10001222'
  }
]

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
  const [isOpen, setIsOpen] = useState(false)

  const customerNames = useMemo(() => customers.map((customer) => customer.name), customers) // todo useMemo() or useEffect()

  const calculatePrice = (price?: string, interest?: string) => {
    const buyPrice = Number(price)
    const interestNum = interest === '' ? 0 : Number(interest) / 100
    const priceWithInterest = buyPrice + interestNum * buyPrice * 4
    return Math.ceil(priceWithInterest / 5) * 5
  }

  const handleSubmit = (values: ProductValuesProps) => {
    const jsonObject = {
      is_buy: values.isBuy,
      name: values.name,
      address: values.address,
      sex: values.sex,
      nationality: values.nationality,
      personal_id: values.personalId,
      personal_id_date: values.personalIdDate,
      birth_place: values.birthPlace,
      birth_id: values.birthId,
      interest_rate_or_amount: Number(values.interestRateOrAmount),
      start_date: values.startDate,
      end_date: values.endDate,
      product_id: Number(values.productId),
      product_name: values.productName,
      product_buy: Number(values.productBuy),
      product_sell: Number(values.productSell)
    }
    try {
      apiService.post(`todo`, { json: jsonObject })
    } catch (error) {
      console.error(error)
      throw error
    }
  }
  return (
    <>
      <div className="p-8 border rounded-xl border-gray-500 shadow-2xl">
        <Formik initialValues={PRODUCT_INIT_VALUES} validationSchema={PRODUCT_SCHEMA} onSubmit={handleSubmit}>
          {({ values, errors, handleSubmit, setFieldValue, touched, resetForm }) => {
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
                        options={customerNames}
                        label="Meno"
                        onChange={(value) => {
                          setFieldValue('name', value)
                          const customer = customers.find((customer) => customer.name === value)
                          if (customer) {
                            setFieldValue('address', customer.address)
                            setFieldValue('sex', customer.sex)
                            setFieldValue('nationality', customer.nationality)
                            setFieldValue('personalId', customer.personalId)
                            setFieldValue('personalIdDate', customer.personalIdDate)
                            setFieldValue('birthPlace', customer.birthPlace)
                            setFieldValue('birthId', customer.birthId)
                          }
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
                          onChange={(value) => {
                            setFieldValue('productBuy', value)
                            if (!isBuy) {
                              setFieldValue('productSell', calculatePrice(value, values.interestRateOrAmount))
                            }
                          }}
                          errored={!!(errors.productBuy && touched.productBuy)}
                          isDecimal
                        />
                        <InputNumber
                          classNameInput="w-16"
                          name="interestRateOrAmount"
                          label={isBuy ? 'ks' : '%'}
                          onChange={(value) => {
                            setFieldValue('interestRateOrAmount', value)
                            if (!isBuy) {
                              setFieldValue('productSell', calculatePrice(values.productBuy, value))
                            }
                          }}
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
                        className="w-32 "
                        onClick={() => {
                          resetForm()
                        }}
                        text="Vyčistiť"
                        cancel
                      />
                      <Button className="w-32" type="submit" text="Potvrdiť" submit />
                    </div>
                  </div>
                </div>
              </form>
            )
          }}
        </Formik>
      </div>
      <SubmitModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleSubmit={() => {
          console.log('press submit')
        }}
        title="Potvrdiť"
        subtitle="Naozaj chcete pridať záznam?"
      />
    </>
  )
}

export default ProductForm
