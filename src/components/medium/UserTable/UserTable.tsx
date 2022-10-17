import { useState, useEffect } from 'react'
import { getUserRole } from '@components/globals/utils'
import { Input } from '@components/small/Input'
import Router from 'next/router'
import { fetchUsers } from '@api/service/service'

const UserTable = () => {
  const [users, setUsers] = useState<{ email: string; role: string; id: string }[]>([])
  const [filteredUsers, setFilteredUsers] = useState<{ email: string; role: string; id: string }[]>([])

  const getFilteredUsers = (value?: string) => {
    if (!value) {
      return users
    } else {
      return users.filter(
        (el) =>
          el.email.toLocaleLowerCase().includes(value.toLocaleLowerCase()) ||
          getUserRole(el.role).toLocaleLowerCase().includes(value.toLocaleLowerCase())
      )
    }
  }
  useEffect(() => {
    fetchUsers().then((users) => {
      if (users) {
        setUsers(users)
        setFilteredUsers(users)
      }
    })
  }, [])

  return (
    <div>
      <Input
        className="flex justify-center"
        name="autocomplete"
        classNameInput="w-96"
        placeholder="Vyhladávaní"
        onChange={(value) => setFilteredUsers(getFilteredUsers(value))}
      />
      <div className="flex flex-row p-3 font-bold border-gray-400 rounded-t border-x border-t mx-10 mt-10 w-[500px]">
        <div className="w-1/2 flex justify-center border-r">Email</div>
        <div className="w-1/2 flex justify-center">Role</div>
      </div>
      <div className="flex flex-col divide-gray-400 divide-y border-gray-400 border  rounded-b mx-10 overflow-y-auto max-h-[600px]">
        {filteredUsers.map((user) => (
          <div
            key={user.email}
            onClick={() => Router.push(`/uzivatel/${user.id}/`)}
            className="flex flex-row space-x-1 items-center w-full p-3 hover:border-black hover:bg-gray-50  hover:cursor-pointer"
          >
            <div className="w-1/2 flex justify-center truncate border-r"> {user.email}</div>
            <div className="w-1/2 flex justify-center truncate">{getUserRole(user.role)}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UserTable
