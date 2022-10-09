import { object, string } from 'yup'
import { ProductValuesProps } from '@components/forms/ProductCreationForm/ProductCreationForm.types'

export const SEX_OPTIONS = [
  { value: 'M', label: 'Muž' },
  { value: 'F', label: 'Žena' }
]
export const FORM_TYPE = [
  { value: false, label: 'Zastavarna' },
  { value: true, label: 'Bazar' }
]
export const NATIONALITY_OPTIONS = ['ČR', 'SK']

export const PRODUCT_INIT_VALUES: ProductValuesProps = {
  isBuy: false,
  name: '',
  residence: '',
  sex: '',
  nationality: '',
  personalId: '',
  personalIdDate: '',
  birthplace: '',
  birthId: '',
  interestRateOrQuantity: '',
  inventoryId: '',
  productName: '',
  buyPrice: '',
  sellPrice: ''
}

export const PRODUCT_SCHEMA = (): any =>
  object()
    .shape({
      name: string().required(),
      residence: string().required(),
      nationality: string().required(),
      personalId: string().required(),
      personalIdDate: string()
        .required()
        .matches(/^\d{2}[/]\d{2}[/]\d{4}/),
      birthplace: string().required(),
      birthId: string().required(),
      interestRateOrQuantity: string().required(),
      inventoryId: string().required().matches(/^\d+$/),
      productName: string().required(),
      buyPrice: string()
        .required()
        .matches(/^\d+$|^\d+[.]\d{1,2}$/),
      sellPrice: string()
        .required()
        .matches(/^\d+$|^\d+[.]\d{1,2}$/)
    })
    .required()

export const STYLE_ROW_FORM = 'flex items-center justify-between space-x-5 mx-5'
