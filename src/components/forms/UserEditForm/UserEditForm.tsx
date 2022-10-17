import { useState, FC } from 'react'

import { Input } from '@components/small/Input'
import { Button } from '@components/small/Button'
import { getUserRole } from '@components/globals/utils'

interface UserEditFormProps {
  user: { email: string; role: string; id: string }
}

const UserEditForm: FC<UserEditFormProps> = ({ user }) => {
  const [password, setPassword] = useState('')
  const [passwordCheck, setPasswordCheck] = useState('')

  const handleDeleteUser = () => {
    console.log('zmazat') //todo
  }
  const handlePasswordChange = () => {
    console.log('zmnit') //todo
  }
  return (
    <div className="flex space-x-6 items-center">
      <div className="  p-8 border rounded-xl border-gray-500 shadow-2xl space-y-4 w-[700px] items-center mx-24 ">
        <div className="text-center space-y-1 font-medium border-b border-gray-300 pb-4 w-full">
          <div className="text-2xl">{user.email}</div>
          <div className="text-xl">{getUserRole(user.role)}</div>
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
          <Button
            className="w-48"
            text="Potvrdiť"
            doubleCheck
            doubleCheckSubtitle="Naozaj chcete zmenit heslo?"
            submit
            onClick={() => handlePasswordChange()}
          />
        </div>
        {user.role !== 'ADMIN' ? (
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
  )
}

export default UserEditForm
