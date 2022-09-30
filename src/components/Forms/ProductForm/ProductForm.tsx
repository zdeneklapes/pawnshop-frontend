import { format, addWeeks } from 'date-fns'
import { Formik } from 'formik'
import { object } from 'yup'
import { Input } from '@components/small/Input'
import { Combobox } from '@components/small/Combobox'
import { Radio } from '@components/small/Radio'

// export interface ProductFormProps {}

export interface ProductValuesProps {
  name: string
  address: string
  sex: string
  nationality: string
  personalId: string
  personalIdDate: string
  birthPlace: string
  birthId: string
  interestRate: number
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
  name: '',
  address: '',
  sex: '',
  nationality: '',
  personalId: '',
  personalIdDate: '',
  birthPlace: '',
  birthId: '',
  interestRate: 0,
  startDate: format(new Date(), 'dd/MM/yyyy'),
  endDate: format(addWeeks(new Date(), 4), 'dd/MM/yyyy'),
  extendedDate: '',
  productId: '',
  productName: '',
  productBuy: '',
  productSell: '',
  amount: ''
}
const nameOptions = ['option1', 'option2']
const SEX_OPTIONS = [
  { value: 'male', label: 'Muž' },
  { value: 'female', label: 'Žena' }
]
const nationalityOptions = ['ČR', 'SK']

export const PRODUCT_SCHEMA = (): any => object().shape({}).required()

const ProductForm = () => {
  const handleSubmit = (values: ProductValuesProps) => {
    console.log(values)
  }
  return (
    <div className="p-4 border rounded-xl border-gray-500 shadow-2xl">
      <Formik initialValues={PRODUCT_INIT_VALUES} validationSchema={PRODUCT_SCHEMA} onSubmit={handleSubmit}>
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <div className="flex flex-col space-y-4 ">
              <div className="flex space-x-10 justify-center">
                <Combobox
                  options={nameOptions}
                  label="Meno"
                  onChange={(value) => formik.setFieldValue('name', value)}
                  value={formik.values.name}
                />
                <Input
                  name="address"
                  label="Adresa"
                  onChange={(e) => formik.setFieldValue('address', e.target.value)}
                />
              </div>
              <div className="flex space-x-8 justify-center items-center">
                <Radio
                  options={SEX_OPTIONS}
                  label="Pohlavie"
                  onChange={(value) => formik.setFieldValue('sex', value)}
                />
                <Combobox
                  className="w-40"
                  label="Národnosť"
                  options={nationalityOptions}
                  onChange={(value) => formik.setFieldValue('nationality', value)}
                  value={formik.values.nationality}
                />
              </div>
              <div className="flex space-x-10 items-center justify-center">
                <Input
                  name="personalId"
                  label="Číslo OP"
                  onChange={(e) => formik.setFieldValue('personalId', e.target.value)}
                />
                <Input
                  name="personalIdDate"
                  label="Platnosť do"
                  onChange={(e) => formik.setFieldValue('personalIdDate', e.target.value)}
                />
              </div>
              <div className="flex space-x-10 items-center justify-center pb-6 border-b border-gray-300">
                <Input
                  name="birthId"
                  label="Rodné číslo"
                  onChange={(e) => formik.setFieldValue('birthId', e.target.value)}
                />
                <Input
                  name="birthPlace"
                  label="Místo narození"
                  onChange={(e) => formik.setFieldValue('birthPlace', e.target.value)}
                />
              </div>
              <div className="flex space-x-10 items-center justify-center">
                <Input name="startDate" label="Uzavírají dne" value={formik.values.startDate} disabled />
                <Input name="endDate" label="Splatná dne" value={formik.values.endDate} disabled />
              </div>
              <div className="flex space-x-10 items-center justify-center">
                <Input
                  name="productName"
                  label="Předmet"
                  value={formik.values.productName}
                  onChange={(e) => formik.setFieldValue('productName', e.target.value)}
                />
                <Input
                  name="productId"
                  label="Inventárí číslo"
                  value={formik.values.productId}
                  onChange={(e) => formik.setFieldValue('productId', e.target.value)}
                />
              </div>
            </div>

            <button type="submit" className="rounded-xl border border-blue-400 p-2">
              Potvrdit
            </button>
          </form>
        )}
      </Formik>
    </div>
  )
}

export default ProductForm
