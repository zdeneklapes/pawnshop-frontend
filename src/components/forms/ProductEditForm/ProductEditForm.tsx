import { useState, FC } from 'react'
import { Formik } from 'formik'

import { Input } from '@components/small/Input'
import { InputNumber } from '@components/small/InputNumber'
import { Button } from '@components/small/Button'
import { SubmitModal } from '@components/small/SubmitModal'
import { ProductTableFetchingProps } from '@components/medium/ProductTable/ProductTable.types'

import { apiService } from '@api/service/service'

import { STYLE_ROW_FORM } from '@components/forms/ProductCreationForm/ProductCreationForm.const'

import { InformationModal } from '@components/small/InformationModal'
import { dateFormatFromDatabase, dateFormatIntoDatabase } from '@components/globals/utils'
import { object, string } from 'yup'

const PRODUCT_SCHEMA = (): any =>
  object()
    .shape({
      dateCreate: string()
        .required()
        .matches(/^\d{2}[/]\d{2}[/]\d{4}/),
      inventoryId: string().required().matches(/^\d+$/),
      productName: string().required(),
      sellPrice: string()
        .required()
        .matches(/^\d+$|^\d+[.]\d{1,2}$/)
    })
    .required()

interface ProductCreationFormProps {
  product: ProductTableFetchingProps
}
interface ProductEditProps {
  user: string
  inventoryId: string
  productName: string
  sellPrice: string
  dateCreate: string
  dateExtend: string
}

const ProductEditForm: FC<ProductCreationFormProps> = ({ product }) => {
  const [isOpenSubmitModal, setIsOpenSubmitModal] = useState(false)
  const [isOpenInformationSuccessModal, setIsOpenInformationSuccessModal] = useState(false)
  const [isOpenInformationErrorModal, setIsOpenInformationErrorModal] = useState(false)

  const PRODUCT_INIT_VALUES = {
    user: '1',
    inventoryId: product.inventory_id.toString(),
    productName: product.product_name,
    sellPrice: product.sell_price.toString(),
    dateCreate: dateFormatFromDatabase(product.date_create),
    dateExtend: dateFormatFromDatabase(product.date_extend)
  }

  const handleModalSubmit = async (values: ProductEditProps) => {
    const jsonObject = {
      update: 'UPDATE_DATA',
      user: 1, // todo delete user
      inventory_id: Number(values.inventoryId),
      product_name: values.productName,
      sell_price: Number(values.sellPrice),
      date_create: dateFormatIntoDatabase(values.dateCreate),
      date_extend: dateFormatIntoDatabase(values.dateExtend)
    }
    try {
      await apiService.patch(`product/${product.id}/`, { json: jsonObject }).json()
      setIsOpenInformationSuccessModal(true)
    } catch (error) {
      console.error(error)
      setIsOpenInformationErrorModal(true)
    }
  }
  return (
    <>
      <div className="p-8 border rounded-xl border-gray-500 shadow-2xl">
        <Formik
          initialValues={PRODUCT_INIT_VALUES}
          validationSchema={PRODUCT_SCHEMA}
          onSubmit={() => setIsOpenSubmitModal(true)}
        >
          {({ values, errors, handleSubmit, setFieldValue, touched }) => {
            return (
              <form onSubmit={handleSubmit}>
                <div className="divide-y divide-gray-400">
                  <div className="flex flex-col space-y-4 pb-6">
                    <div className={STYLE_ROW_FORM}>
                      <Input name="name" label="Jmeno" value={product.customer.full_name} disabled />
                      <Input name="residence" label="Adresa" value={product.customer.residence} disabled />
                      <Input name="nationality" label="Národnosť" value={product.customer.nationality} disabled />
                    </div>
                    <div className={STYLE_ROW_FORM}>
                      <Input name="birthId" label="Rodné číslo" value={product.customer.id_birth} disabled />
                      <Input name="personalId" label="Číslo OP" value={product.customer.personal_id} disabled />
                      <Input
                        name="personalIdDate"
                        label="Platnosť do"
                        value={dateFormatFromDatabase(product.customer.personal_id_expiration_date)}
                        disabled
                      />
                    </div>
                    <div className="flex items-center justify-center space-x-16">
                      <Input
                        name="sex"
                        label="Pohlavie"
                        value={product.customer.sex === 'M' ? 'Muž' : 'Žena'}
                        disabled
                      />
                      <Input name="birthplace" label="Místo narození" value={product.customer.birthplace} disabled />
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
                        name="inventoryId"
                        label="Inventárí číslo"
                        onChange={(value) => setFieldValue('inventoryId', value)}
                        value={values.inventoryId}
                        errored={!!(errors.inventoryId && touched.inventoryId)}
                        isDecimal
                      />
                    </div>
                    <div className={STYLE_ROW_FORM}>
                      <div className="flex space-x-4">
                        <InputNumber
                          classNameInput="w-64"
                          name="buyPrice"
                          label={product.status === 'OFFER' ? 'Nákup' : 'Pújička'}
                          value={product.buy_price.toString()}
                          disabled
                        />
                        <InputNumber
                          classNameInput="w-16"
                          name="interestRateOrQuantity"
                          label={product.status === 'OFFER' ? 'ks' : '%'}
                          value={product.interest_rate_or_quantity.toString()}
                          disabled
                        />
                      </div>
                      <InputNumber
                        classNameInput="w-64"
                        name="sellPrice"
                        label={product.status === 'OFFER' ? 'Prodej' : 'K vyplacení'}
                        value={values.sellPrice}
                        onChange={(value) => setFieldValue('sellPrice', value)}
                        disabled={product.status !== 'OFFER'}
                        errored={!!(errors.sellPrice && touched.sellPrice)}
                      />
                    </div>
                    {product.status !== 'OFFER' ? (
                      <div className="rounded py-3 border-gray-300 border shadow-sm space-y-2">
                        {[1, 2, 3, 4].map((num, index) => (
                          <div key={index}>
                            {/*<p>{num}. tyzden</p>*/}
                            <div className={STYLE_ROW_FORM}>
                              <div className="flex space-x-4">
                                <Input
                                  label={num === 1 ? 'Od' : ''}
                                  value={dateFormatFromDatabase(product.interest[index].from)}
                                  disabled
                                />
                                <Input
                                  label={num === 1 ? 'Do' : ''}
                                  value={dateFormatFromDatabase(product.interest[index].to)}
                                  disabled
                                />
                                <Input
                                  label={num === 1 ? 'Cena' : ''}
                                  value={product.interest[index].price.toString()}
                                  disabled
                                />
                              </div>
                            </div>
                          </div>
                        ))}{' '}
                      </div>
                    ) : null}
                  </div>
                  <div className="pt-6 space-y-4">
                    <div className={STYLE_ROW_FORM}>
                      <Input name="startDate" label="Uzavírají dne" value={dateFormatFromDatabase(values.dateCreate)} />
                      <Input name="startDate" label="Prodlouženo" value={dateFormatFromDatabase(values.dateExtend)} />
                      <Input
                        name="endDate"
                        label="Splatná dne"
                        value={dateFormatFromDatabase(product.date_end)}
                        disabled
                      />
                    </div>
                    <div className={STYLE_ROW_FORM}>
                      <Button className="w-48" text="Nákup" />
                      <Button className="w-48" text="Prodej" />
                      <Button className="w-48" type="submit" text="Potvrdiť" submit />
                    </div>
                  </div>
                </div>
                <SubmitModal
                  isOpen={isOpenSubmitModal}
                  setIsOpen={setIsOpenSubmitModal}
                  handleSubmit={() => {
                    handleModalSubmit(values)
                  }}
                  title="Potvrdiť"
                  subtitle="Naozaj chcete upraviť záznam?"
                />
                <InformationModal
                  isOpen={isOpenInformationSuccessModal}
                  setIsOpen={setIsOpenInformationSuccessModal}
                  isSuccess
                  title="Produkt uspecne upraveny"
                />
                <InformationModal
                  isOpen={isOpenInformationErrorModal}
                  setIsOpen={setIsOpenInformationErrorModal}
                  isError
                  title="Chyba!"
                  subtitle="Produkt sa nepodarilo upraviť!"
                />
              </form>
            )
          }}
        </Formik>
      </div>
    </>
  )
}

export default ProductEditForm
