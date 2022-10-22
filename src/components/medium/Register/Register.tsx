import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Input } from '@components/small/Input'
import { Button } from '@components/small/Button'
import { apiService } from '@api/service/service'
import { InformationModal } from '@components/small/InformationModal'

const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordCheck, setPasswordCheck] = useState('')
  const [error, setError] = useState('')
  const [isOpenInformationErrorModal, setIsOpenInformationErrorModal] = useState(false)

  const router = useRouter()

  const createAttendant = async () => {
    try {
      const apiAuthenticated = apiService.extend({
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      })
      await apiAuthenticated
        .post('authentication/attendant/', {
          json: { email: email, password: password, verify_password: passwordCheck }
        })
        .then(() => router.reload())
    } catch (error) {
      console.error(error)
      setIsOpenInformationErrorModal(true)
    }
  }

  const validateInputs = () => {
    if (!email || !password || !passwordCheck) {
      setError('Vyplnte všechny políčka.')
      return false
    } else if (
      !email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      setError('Email nemá správnu formu')
      return false
    } else if (password !== passwordCheck) {
      setError('Heslá se nezhodujú.')
      return false
    } else if (password.length < 8) {
      setError('Heslo musi mat 8 a viac znakov')
      return false
    }
    return true
  }
  const handleSubmit = async () => {
    if (validateInputs()) {
      createAttendant()
    }
  }
  useEffect(() => {
    setError('')
  }, [email, password, passwordCheck])
  return (
    <>
      <div className="flex flex-col justify-center items-center border h-[450px] w-[500px] rounded-xl border-gray-500 shadow-2xl space-y-4 px-20">
        <div className="text-2xl font-medium">Přidaní novej obsluhy</div>
        <Input
          autocomplete="new-password"
          label="email"
          classNameInput="w-80"
          onChange={(value) => setEmail(value ? value : '')}
          value={email}
        />
        <Input
          label="heslo"
          type="password"
          classNameInput="w-80"
          onChange={(value) => setPassword(value ? value : '')}
          value={password}
          autocomplete="new-password"
        />
        <Input
          label="heslo potvrdení"
          type="password"
          classNameInput="w-80"
          onChange={(value) => setPasswordCheck(value ? value : '')}
          value={passwordCheck}
          autocomplete="new-password"
        />
        <div className="text-red-700 text-center h-5">{error}</div>
        <Button
          text="Vytvrořiť"
          onClick={() => handleSubmit()}
          className="w-48"
          submit
          doubleCheck
          doubleCheckSubtitle="Naozaj chcete vytvrořit obsluhu?"
        />
      </div>
      <InformationModal
        isOpen={isOpenInformationErrorModal}
        setIsOpen={setIsOpenInformationErrorModal}
        isError
        title="Chyba!"
        subtitle="Obsluha sa nepodařila vytvořiť"
      />
    </>
  )
}

export default Register
