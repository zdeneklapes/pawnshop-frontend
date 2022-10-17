import { useState, useEffect } from 'react'
import { Input } from '@components/small/Input'
import { Button } from '@components/small/Button'

const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordCheck, setPasswordCheck] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    if (email && password && passwordCheck) {
      if (password === passwordCheck) {
        console.log('submit') // todo
      } else {
        setError('Heslá se nezhodujú.')
      }
    } else {
      setError('Vyplnte všechny políčka.')
    }
  }
  useEffect(() => {
    setError('')
  }, [email, password, passwordCheck])
  return (
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
  )
}

export default Register
