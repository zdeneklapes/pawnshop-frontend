import { useState, FC, useContext } from 'react'
import { Formik } from 'formik'
import { object, string } from 'yup'

import { Input } from '@components/small/Input'
import { InputNumber } from '@components/small/InputNumber'
import { Button } from '@components/small/Button'
import { SubmitModal } from '@components/small/SubmitModal'
import { InformationModal } from '@components/small/InformationModal'
import { InputModal } from '@components/small/InputModal'

import { dateFormatFromDatabase, dateFormatIntoDatabase } from '@components/globals/utils'
import { ProductTableFetchingProps } from '@components/medium/ProductTable/ProductTable.types'
import { STYLE_ROW_FORM } from '@components/forms/ProductCreationForm/ProductCreationForm.const'

import { apiService } from '@api/service/service'
import { UserContext } from '@pages/_app'

const PRODUCT_SCHEMA = (): any =>
  object()
    .shape({
      dateCreate: string()
        .required()
        .matches(/^\d{2}[/]\d{2}[/]\d{4}$/),
      dateExtend: string()
        .required()
        .matches(/^\d{2}[/]\d{2}[/]\d{4}$/),
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

const ProductEditForm: FC<ProductCreationFormProps> = ({ product }) => {
  const [isOpenSubmitModal, setIsOpenSubmitModal] = useState(false)
  const [isOpenInformationSuccessModal, setIsOpenInformationSuccessModal] = useState(false)
  const [isOpenInformationErrorModal, setIsOpenInformationErrorModal] = useState(false)
  const [isOpenQuantityModal, setIsOpenQuantityModal] = useState(false)
  const [isOpenPriceModal, setIsOpenPriceModal] = useState(false)
  const [isBuy, setIsBuy] = useState(false)
  const [quantity, setQuantity] = useState('')
  const [price, setPrice] = useState('')

  const { user }: any = useContext(UserContext)

  const PRODUCT_INIT_VALUES = {
    inventoryId: product.inventory_id.toString(),
    productName: product.product_name,
    sellPrice: product.sell_price.toString(),
    dateCreate: dateFormatFromDatabase(product.date_create),
    dateExtend: dateFormatFromDatabase(product.date_extend)
  }
  const handleUpdateProduct = async (jsonObject: any) => {
    try {
      const apiAuthenticated = apiService.extend({
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      })
      const result = await apiAuthenticated.patch(`product/${product.id}/`, { json: jsonObject }).json()
      setIsOpenInformationSuccessModal(true)
      return result
    } catch (error) {
      console.error(error)
      setIsOpenInformationErrorModal(true)
    }
  }

  const handleQuantitySubmit = () => {
    setIsOpenQuantityModal(false)
    if (quantity) {
      handleUpdateProduct({
        update: isBuy ? 'OFFER_BUY' : 'OFFER_SELL',
        quantity: Number(quantity)
      })
    }
  }
  const handlePriceSubmit = () => {
    setIsOpenPriceModal(false)
    if (price) {
      handleUpdateProduct({
        update: 'LOAN_TO_OFFER',
        sell_price: price
      })
    }
  }

  if (product.status === 'INACTIVE_OFFER' || product.status === 'INACTIVE_LOAN') {
    return (
      <div className="text-xl">
        Produkt {product.status === 'INACTIVE_OFFER' ? 'z bazaru' : 'zo zastavárny'} je neaktivní.
      </div>
    )
  }
  return (
    <div className="flex space-x-6 items-center">
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
                      <Input name="name" label="Jméno" value={product.customer.full_name} disabled />
                      <Input name="residence" label="Adresa" value={product.customer.residence} disabled />
                      <Input name="nationality" label="Národnost" value={product.customer.nationality} disabled />
                    </div>
                    <div className={STYLE_ROW_FORM}>
                      <Input name="birthId" label="Rodné číslo" value={product.customer.id_birth} disabled />
                      <Input name="personalId" label="Číslo OP" value={product.customer.personal_id} disabled />
                      <Input
                        name="personalIdDate"
                        label="Platnost do"
                        value={dateFormatFromDatabase(product.customer.personal_id_expiration_date)}
                        disabled
                      />
                    </div>
                    <div className="flex items-center justify-center space-x-16">
                      <Input
                        name="sex"
                        label="Pohlaví"
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
                        label="Inventární číslo"
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
                          value={
                            product.status === 'OFFER'
                              ? Number(product.interest_rate_or_quantity).toFixed()
                              : product.interest_rate_or_quantity.toString()
                          }
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
                  </div>
                  <div className="py-6 space-y-4">
                    <div className={STYLE_ROW_FORM}>
                      <Input
                        name="dateCreate"
                        label="Uzavírají dne"
                        value={values.dateCreate}
                        onChange={(value) => setFieldValue('dateCreate', value)}
                        errored={!!(errors.dateCreate && touched.dateCreate)}
                        disabled={user.role !== 'ADMIN'}
                      />
                      <Input
                        name="dateExtend"
                        label="Prodlouženo"
                        value={values.dateExtend}
                        onChange={(value) => setFieldValue('dateExtend', value)}
                        errored={!!(errors.dateExtend && touched.dateExtend)}
                        disabled={user.role !== 'ADMIN'}
                      />
                      <Input
                        name="endDate"
                        label="Splatná dne"
                        value={dateFormatFromDatabase(product.date_end)}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="pt-6 space-y-4">
                    {product.status === 'OFFER' ? (
                      <div className="flex items-center justify-center space-x-16 mx-5">
                        <Button
                          className="w-48"
                          text="Nákup"
                          onClick={() => {
                            setIsBuy(true)
                            setQuantity('')
                            setIsOpenQuantityModal(true)
                          }}
                        />
                        <Button
                          className="w-48"
                          text="Prodej"
                          onClick={() => {
                            setIsBuy(false)
                            setQuantity('')
                            setIsOpenQuantityModal(true)
                          }}
                        />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-16 mx-5">
                        <Button
                          className="w-48"
                          text="Vrátit"
                          onClick={() =>
                            handleUpdateProduct({
                              update: 'LOAN_RETURN'
                            })
                          }
                          doubleCheck
                          doubleCheckSubtitle="Skutečně chcete vrátit?"
                        />
                        <Button
                          className="w-48"
                          text="Prodloužit"
                          onClick={() => {
                            handleUpdateProduct({
                              update: 'LOAN_EXTEND'
                            }).then((res: any) => {
                              setFieldValue('dateExtend', dateFormatFromDatabase(res.date_extend))
                            })
                          }}
                          doubleCheck
                          doubleCheckSubtitle="Skutečně chcete prodloužiť?"
                        />
                        {product.status === 'AFTER_MATURITY' ? (
                          <Button
                            className="w-48"
                            text="Presunout do bazaru"
                            onClick={() => setIsOpenPriceModal(true)}
                            doubleCheck
                            doubleCheckSubtitle="Skutečně chcete presunout do bazaru?"
                          />
                        ) : null}
                      </div>
                    )}

                    <div className="flex items-center justify-center space-x-16 mx-5">
                      {/*<Button*/}
                      {/*  className="w-48"*/}
                      {/*  text="Tisknout"*/}
                      {/*  doubleCheck*/}
                      {/*  doubleCheckSubtitle="Skutečně chcete tlačiť?"*/}
                      {/*/>*/}
                      <Button className="w-48" type="submit" text="Potvrdit" submit />
                    </div>
                  </div>
                </div>
                <SubmitModal
                  isOpen={isOpenSubmitModal}
                  setIsOpen={setIsOpenSubmitModal}
                  handleSubmit={() => {
                    handleUpdateProduct({
                      update: 'UPDATE_DATA',
                      inventory_id: Number(values.inventoryId),
                      product_name: values.productName,
                      sell_price: Number(values.sellPrice),
                      date_create: dateFormatIntoDatabase(values.dateCreate),
                      date_extend: dateFormatIntoDatabase(values.dateExtend)
                    })
                  }}
                  title="potvrdit"
                  subtitle="Skutečně chcete upraviť záznam?"
                />
                <InformationModal
                  isOpen={isOpenInformationSuccessModal}
                  setIsOpen={setIsOpenInformationSuccessModal}
                  isSuccess
                  title="Operace nad produktem sa podařila"
                />
                <InformationModal
                  isOpen={isOpenInformationErrorModal}
                  setIsOpen={setIsOpenInformationErrorModal}
                  isError
                  title="Chyba!"
                  subtitle="Operace nad produktem zlyhala"
                />
                <InputModal
                  isOpen={isOpenQuantityModal}
                  setIsOpen={setIsOpenQuantityModal}
                  handleSubmit={handleQuantitySubmit}
                  input={quantity}
                  setInput={setQuantity}
                  title={isBuy ? 'Koupit' : 'Předat' + ' počet kusú'}
                />
                <InputModal
                  isOpen={isOpenPriceModal}
                  setIsOpen={setIsOpenPriceModal}
                  handleSubmit={handlePriceSubmit}
                  input={price}
                  setInput={setPrice}
                  title="Cena za produkt"
                />
              </form>
            )
          }}
        </Formik>
      </div>
      {product.status !== 'OFFER' ? (
        <div className="p-8 border rounded-xl border-gray-500 shadow-2xl h-96 space-y-4 justify-center flex flex-col items-center">
          <span className="text-xl ">Úroky</span>
          {[1, 2, 3, 4].map((num, index) => (
            <div className="flex space-x-4" key={index}>
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
              <Input label={num === 1 ? 'Cena' : ''} value={product.interest[index].price.toString()} disabled />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}

export default ProductEditForm
