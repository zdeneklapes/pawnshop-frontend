import { useState, FC, useEffect, useContext } from 'react'

import { Input } from '@components/small/Input'
import { Button } from '@components/small/Button'
import { getUserRole } from '@components/globals/utils'
import { apiService } from '@api/service/service'
import { useRouter } from 'next/router'
import { InformationModal } from '@components/small/InformationModal'
import { UserContext } from '@pages/_app'

interface UserEditFormProps {
  userToShow: { email: string; role: string; id: string }
}

const UserEditForm: FC<UserEditFormProps> = ({ userToShow }) => {
  const [password, setPassword] = useState('')
  const [passwordCheck, setPasswordCheck] = useState('')
  const [oldPassword, setOldPassword] = useState('')
  const [isOpenInformationErrorModal, setIsOpenInformationErrorModal] = useState(false)
  const [isOpenInformationSuccessModal, setIsOpenInformationSuccessModal] = useState(false)

  const [errorMessage, setErrorMessage] = useState('')
  const [error, setError] = useState('')

  const router = useRouter()
  const { user }: any = useContext(UserContext)

  const handleDeleteUser = async () => {
    try {
      const apiAuthenticated = apiService.extend({
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      })
      await apiAuthenticated.delete(`authentication/user/${userToShow.id}`).then(() => router.push('/obsluha'))
    } catch (error) {
      console.error(error)
      setErrorMessage('Zmazání obsluhy slyhalo')
      setIsOpenInformationErrorModal(true)
    }
  }
  const handlePasswordChange = async () => {
    if (password && passwordCheck && oldPassword && password.length >= 8 && password === passwordCheck) {
      try {
        const apiAuthenticated = apiService.extend({
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
          }
        })
        await apiAuthenticated
          .patch(`authentication/${user.role === 'ADMIN' ? 'user' : 'attendant'}/${userToShow.id}/`, {
            json: {
              email: userToShow.email,
              password: password,
              verify_password: passwordCheck,
              old_password: oldPassword
            }
          })
          .then(() => router.push('/obsluha'))
      } catch (error) {
        console.error(error)
        setErrorMessage('Zmena hesla slyhala')
        setIsOpenInformationErrorModal(true)
      }
    } else {
      setError('Hesla sa nezhoduju nebo nemaju dlzku 8 a vice.')
    }
  }
  useEffect(() => {
    setError('')
  }, [password, passwordCheck])
  return (
    <>
      <div className="flex space-x-6 items-center">
        <div className="  p-8 border rounded-xl border-gray-500 shadow-2xl space-y-4 w-[700px] items-center mx-24 ">
          <div className="text-center space-y-1 font-medium border-b border-gray-300 pb-4 w-full">
            <div className="text-2xl">{userToShow.email}</div>
            <div className="text-xl">{getUserRole(userToShow.role)}</div>
          </div>
          <div className="flex flex-col items-center space-y-4 ">
            <div className="text-xl font-medium">Zmena hesla</div>
            <div className="flex space-x-6">
              <Input
                label="nové heslo"
                type="password"
                classNameInput="w-64"
                onChange={(value) => setPassword(value ? value : '')}
                value={password}
                autocomplete="new-password"
              />
              <Input
                label="nové heslo potvrdení"
                type="password"
                classNameInput="w-64"
                onChange={(value) => setPasswordCheck(value ? value : '')}
                value={passwordCheck}
                autocomplete="new-password"
              />
            </div>
            <Input
              label="staré heslo"
              type="password"
              classNameInput="w-96"
              onChange={(value) => setOldPassword(value ? value : '')}
              value={oldPassword}
              autocomplete="new-password"
            />
            <div className="text-red-700 text-center h-5">{error}</div>

            <Button
              className="w-48"
              text="Potvrdiť"
              doubleCheck
              doubleCheckSubtitle="Naozaj chcete zmenit heslo?"
              submit
              onClick={() => handlePasswordChange()}
            />
          </div>
          {userToShow.role !== 'ADMIN' && user.role === 'ADMIN' ? (
            <div className="flex justify-center border-t border-gray-300 pt-6  w-full">
              <Button
                className="w-64"
                text="Zmazat obsluhu"
                doubleCheck
                doubleCheckSubtitle="Naozaj chcete zmazat obsluhu?"
                cancel
                onClick={() => handleDeleteUser()}
              />
            </div>
          ) : null}
        </div>
      </div>
      <InformationModal
        isOpen={isOpenInformationErrorModal}
        setIsOpen={setIsOpenInformationErrorModal}
        isError
        title="Chyba!"
        subtitle={errorMessage}
      />
      <InformationModal
        isOpen={isOpenInformationSuccessModal}
        setIsOpen={setIsOpenInformationSuccessModal}
        isSuccess
        title="Zmena hesla uspesne prebehla."
      />
    </>
  )
}

export default UserEditForm
